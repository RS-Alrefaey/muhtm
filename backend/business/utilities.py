import os
import re
import pickle
import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from nltk import pos_tag
from .models import AnalyzedDataset
from collections import Counter
import json

# Setup NLTK resources
nltk.download("punkt")
nltk.download("stopwords")
nltk.download("averaged_perceptron_tagger")

def get_model_path(model_name):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(current_directory, f"models/{model_name}")

def load_model(file_path):
    with open(file_path, "rb") as model_file:
        return pickle.load(model_file)

ASPECTS_cloth = ["fabric", "size", "style", "color"]
ASPECTS_ele = ["Quality", "Price", "Usage", "Size"]

tfidf_3gram_vect = load_model(get_model_path("tfidf_3gram_vectorizer.pkl"))
general_svm_model = load_model(get_model_path("general_svm_model.pkl"))
models = {aspect: load_model(get_model_path(f"{aspect}_svm_model.pkl")) for aspect in ASPECTS_cloth}

tfidf_3gram_vect_ele = load_model(get_model_path("tfidf_3gram_vectorizer_electronics.pkl"))
general_rf_model = load_model(get_model_path("general_rf_model.pkl"))
four_aspects_rf_model = load_model(get_model_path("four_aspects_rf_model.pkl"))



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

def make_predictions(data):
    aspect_predictions = {}
    data["Clean_Text"] = data[0].apply(clean_text)
    data["POS_Tagged"] = data["Clean_Text"].apply(pos_tag_text)
    preprocessed_data = tfidf_3gram_vect.transform(data["POS_Tagged"])

    for aspect in ASPECTS_cloth:
        predictions = models[aspect].predict(preprocessed_data)
        aspect_predictions[aspect] = ["Sentiment is Negative" if pred == -1 else "No Sentiment" if pred == 0 else "Sentiment is Positive" for pred in predictions]

    return aspect_predictions

def make_general_predictions(data):
    data["Clean_Text"] = data[0].apply(clean_text)
    data["POS_Tagged"] = data["Clean_Text"].apply(pos_tag_text)
    preprocessed_data = tfidf_3gram_vect.transform(data["POS_Tagged"])

    predictions = general_svm_model.predict(preprocessed_data)
    return ["Sentiment is Negative" if pred == -1 else "No Sentiment" if pred == 0 else "Sentiment is Positive" for pred in predictions]


def read_and_convert(uploaded_file):

    file_path = uploaded_file.path
    file_extension = os.path.splitext(file_path)[1]

    if file_extension == '.csv':
        data = pd.read_csv(uploaded_file, header=None)
    elif file_extension in ['.xlsx', '.xls']:
        data = pd.read_excel(uploaded_file, header=None)
        csv_filename = os.path.splitext(file_path)[0] + '.csv'
        data.to_csv(csv_filename, index=False)
    else:
        raise ValueError("Unsupported file format")

    return data
 

def make_predictions_electronic(data):
    aspect_predictions = {aspect: [] for aspect in ASPECTS_ele}  # Initialize a dictionary with each aspect
    try:
        # Assuming data is a DataFrame with a column containing the text reviews
        data["Clean_Text"] = data[0].apply(lambda x: clean_text(x))
        data["POS_Tagged"] = data["Clean_Text"].apply(pos_tag_text)
        preprocessed_data = tfidf_3gram_vect_ele.transform(data["POS_Tagged"])

        # Predict for all aspects at once
        predictions = four_aspects_rf_model.predict(preprocessed_data)  # This might return a 2D array

        if len(predictions.shape) == 2 and predictions.shape[1] == len(ASPECTS_ele):
            for idx in range(predictions.shape[0]):  # iterate over reviews
                for aspect_idx, aspect in enumerate(ASPECTS_ele):  # iterate over aspects for a single review
                    pred = predictions[idx, aspect_idx]
                    sentiment = "Sentiment is Negative" if pred == -1 else ("No Sentiment" if pred == 0 else ("Sentiment is Positive" if pred == 1 else "None"))
                    aspect_predictions[aspect].append(sentiment)  # Append sentiment to the corresponding aspect
        else:
            print("Unexpected shape of predictions array")
    except Exception as e:
        print(f"Error occurred: {str(e)}")

    return aspect_predictions



def make_general_predictions_electronic(data):
    data["Clean_Text"] = data[0].apply(clean_text)
    data["POS_Tagged"] = data["Clean_Text"].apply(pos_tag_text)
    preprocessed_data = tfidf_3gram_vect_ele.transform(data["POS_Tagged"])

    predictions = general_rf_model.predict(preprocessed_data)
    return ["Sentiment is Negative" if pred == -1 else "No Sentiment" if pred == 0 else "Sentiment is Positive" for pred in predictions]
 
def prepare_final_data(aspect_predictions, general_predictions):
    # Combine aspect and general predictions
    # Ensure the predictions are in a JSON serializable format
    final_data = {
        "aspects": aspect_predictions,
        "general": general_predictions,
    }
    return json.dumps(final_data)



def process_uploaded_file_and_save(uploaded_file, dataset_instance, user):
    data = read_and_convert(uploaded_file)
    category = dataset_instance.store_category
    

    # Calculate statistics for each aspect
    if category == 'CLOTHES':
        data = data[data[0].notna() & (data[0] != '')]
        aspect_predictions = make_predictions(data)
        general_predictions = make_general_predictions(data)
        
        # Include predictions in the data
        for aspect in ASPECTS_cloth:
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
        for aspect in ASPECTS_cloth:
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

        # Create an instance of AnalyzedDataset
        analyzed_dataset = AnalyzedDataset.objects.create(
            user=user,
            the_dataset=dataset_instance,
            results=final_data
        )
        return analyzed_dataset
    
    elif category == 'ELECTRONIC':
        data = data[data[0].notna() & (data[0] != '')]
        aspect_predictions = make_predictions_electronic(data)
        general_predictions = make_general_predictions_electronic(data)

        # Include predictions in the data
        for aspect in ASPECTS_ele:
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
        for aspect in ASPECTS_ele:
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

        # Create an instance of AnalyzedDataset
        analyzed_dataset = AnalyzedDataset.objects.create(
            user=user,
            the_dataset=dataset_instance,
            results=final_data
        )
        return analyzed_dataset
