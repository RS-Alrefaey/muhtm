import pandas as pd
from preprocessing import *  # Ensure that transform_tfidf function is here or import it explicitly
import pickle

base_path = "C:/Users/shalm/OneDrive/Documents/Level 10/GGP 2/muhtm/backend/cloth-dashboard/models/"

absolute_path_general = base_path + "general_svm_model.pkl"
with open(absolute_path_general, "rb") as model_file:
    general_svm_model = pickle.load(model_file)

vect_path = base_path + "tfidf_3gram_vectorizer.pkl"
with open(vect_path, "rb") as vect_file:
    tfidf_3gram_vect = pickle.load(vect_file)

aspects = ["fabric", "size", "style", "color"]
models = {}
for aspect in aspects:
    model_path = base_path + f"{aspect}_svm_model.pkl"
    with open(model_path, "rb") as model_file:
        models[aspect] = pickle.load(model_file)


def make_general_predictions(data):
    try:
        data["Clean_Text"] = data["Reviews"].apply(lambda x: Clean_Text(x))
        data["POS_Tagged"] = data["Clean_Text"].apply(pos_tag_text)
        preprocessed_data = tfidf_3gram_vect.transform(data["POS_Tagged"])

        predictions = general_svm_model.predict(preprocessed_data)
        general_predictions = [
            "Sentiment is Negative"
            if pred == -1
            else "No Sentiment"
            if pred == 0
            else "Sentiment is Positive"
            if pred == 1
            else "None"
            for pred in predictions
        ]

        return general_predictions
    except Exception as e:
        raise e  # Raise the exception to be handled in Django
