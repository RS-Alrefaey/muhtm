import os
import re
import csv
import logging
import pickle

import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from nltk import pos_tag

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from collections import Counter


# Setup NLTK resources
nltk.download("punkt")
nltk.download("stopwords")
nltk.download("averaged_perceptron_tagger")

PUNCTUATION_RE = "[?؟!٪,،@#$%&*€+-£_~\“̯/=><.\۰):؛}{÷%(\"'ًٌٍَُِّْ٠-٩]"
ARABIC_DIACRITICS_RE = re.compile(
    """
                             ّ    | # Tashdid
                             َ    | # Fatha
                             ً    | # Tanwin Fath
                             ُ    | # Damma
                             ٌ    | # Tanwin Damm
                             ِ    | # Kasra
                             ٍ    | # Tanwin Kasr
                             ْ    | # Sukun
                             ـ     # Tatwil/Kashida
                         """,
    re.VERBOSE,
)

ArabicStopwords = set(stopwords.words("arabic")) - set(
    ["لا", "ما", "إلا", "ليس", "لن", "لم", "دون", "غير", "لست", "مب", "مش"]
)
stemmer = SnowballStemmer("arabic")

def clean_text(text):
    text = re.sub(PUNCTUATION_RE, " ", text)
    text = re.sub(ARABIC_DIACRITICS_RE, "", text)
    text = ' '.join(word for word in word_tokenize(text) if word not in ArabicStopwords)
    text = ' '.join(stemmer.stem(word) for word in word_tokenize(text))
    return text

def pos_tag_text(text):
    sentences = nltk.sent_tokenize(text)
    tagged_sentences = [" ".join(f"{word}/{tag}" for word, tag in pos_tag(nltk.word_tokenize(sentence))) for sentence in sentences]
    return " ".join(tagged_sentences)

def load_model(file_path):
    with open(file_path, "rb") as model_file:
        return pickle.load(model_file)

general_svm_model = load_model("frontend/models/general_svm_model.pkl")
tfidf_3gram_vect = load_model("frontend/models/tfidf_3gram_vectorizer.pkl")

ASPECTS = ["fabric", "size", "style", "color"]
models = {aspect: load_model(f"frontend/models/{aspect}_svm_model.pkl") for aspect in ASPECTS}

def make_predictions(data):
    aspect_predictions = {}
    data["Clean_Text"] = data["Reviews"].apply(clean_text)
    data["POS_Tagged"] = data["Clean_Text"].apply(pos_tag_text)
    preprocessed_data = tfidf_3gram_vect.transform(data["POS_Tagged"])

    for aspect in ASPECTS:
        predictions = models[aspect].predict(preprocessed_data)
        aspect_predictions[aspect] = ["Sentiment is Negative" if pred == -1 else "No Sentiment" if pred == 0 else "Sentiment is Positive" for pred in predictions]

    return aspect_predictions

def make_general_predictions(data):
    data["Clean_Text"] = data["Reviews"].apply(clean_text)
    data["POS_Tagged"] = data["Clean_Text"].apply(pos_tag_text)
    preprocessed_data = tfidf_3gram_vect.transform(data["POS_Tagged"])

    predictions = general_svm_model.predict(preprocessed_data)
    return ["Sentiment is Negative" if pred == -1 else "No Sentiment" if pred == 0 else "Sentiment is Positive" for pred in predictions]


@csrf_exempt
def generate_json(request):
    if request.method == 'POST':
        uploaded_file = request.FILES['csv']
        data = pd.read_csv(uploaded_file)

        # Generate predictions
        aspect_predictions = make_predictions(data)
        general_predictions = make_general_predictions(data)

        # Include predictions in the data
        for aspect in ASPECTS:
            data[f"{aspect}_Prediction"] = aspect_predictions[aspect]
        data["General_Prediction"] = general_predictions

        # Drop unnecessary columns
        data.drop(columns=['POS_Tagged', 'Clean_Text'], inplace=True)

        # Prepare the final data to include in the JSON
        final_data = {
            'reviews': data.to_dict(orient='records'),
            'statistics': {
                'total_reviews': len(data),
            },
        }

        # Calculate statistics for each aspect
        for aspect in ASPECTS:
            aspect_stats = Counter(data[f"{aspect}_Prediction"])
            final_data['statistics'][f"{aspect}_stats"] = {
                'positive': aspect_stats.get("Sentiment is Positive", 0),
                'negative': aspect_stats.get("Sentiment is Negative", 0),
                'neutral': aspect_stats.get("No Sentiment", 0),
            }

        # Calculate general statistics
        general_stats = Counter(data["General_Prediction"])
        final_data['statistics']['general_stats'] = {
            'positive': general_stats.get("Sentiment is Positive", 0),
            'negative': general_stats.get("Sentiment is Negative", 0),
            'neutral': general_stats.get("No Sentiment", 0),
        }

        # Return as JSON
        return JsonResponse(final_data, safe=False)

    return JsonResponse({'success': False, 'error': 'Invalid method'})