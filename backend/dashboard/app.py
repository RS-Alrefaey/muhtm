import streamlit as st
import pandas as pd
from preprocessing import *  # Ensure that transform_tfidf function is here or import it explicitly
import pickle
import plotly.express as px  # Import Plotly Express for visualization

# Load the general model
with open("models/general_svm_model.pkl", "rb") as model_file:
    general_svm_model = pickle.load(model_file)

# Load the TfidfVectorizer
with open("models/tfidf_3gram_vectorizer.pkl", "rb") as vect_file:
    tfidf_3gram_vect = pickle.load(vect_file)

# Load the models for each aspect
aspects = ["fabric", "size", "style", "color"]
models = {}
for aspect in aspects:
    with open(f"models/{aspect}_svm_model.pkl", "rb") as model_file:
        models[aspect] = pickle.load(model_file)


def make_predictions(data):
    aspect_predictions = {}
    try:
        data["Clean_Text"] = data["Reviews"].apply(lambda x: Clean_Text(x))
        data["POS_Tagged"] = data["Clean_Text"].apply(pos_tag_text)
        preprocessed_data = tfidf_3gram_vect.transform(data["POS_Tagged"])

        for aspect in aspects:
            predictions = models[aspect].predict(preprocessed_data)
            interpreted_predictions = [
                "Sentiment is Negative"
                if pred == -1
                else "No Sentiment"
                if pred == 0
                else "Sentiment is Positive"
                if pred == 1
                else "None"
                for pred in predictions
            ]
            aspect_predictions[aspect] = interpreted_predictions

    except Exception as e:
        st.error(f"Error occurred: {str(e)}")
        return None

    return aspect_predictions


def make_general_predictions(data):
    try:
        # Clean Text
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
        st.error(f"Error occurred: {str(e)}")
        return None


def create_bar_chart(aspect_predictions):
    aspect_data = []

    for aspect, predictions in aspect_predictions.items():
        counts = dict(pd.Series(predictions).value_counts())
        for sentiment, count in counts.items():
            aspect_data.append(
                {"aspect": aspect, "sentiment": sentiment, "count": count}
            )

    df = pd.DataFrame(aspect_data)
    fig = px.bar(
        df, x="aspect", y="count", color="sentiment", barmode="group", text="count"
    )
    return fig


def create_pie_chart(predictions):
    # Count the occurrence of each prediction
    counts = dict(pd.Series(predictions).value_counts())

    # Create a pie chart
    fig = px.pie(
        values=counts.values(),
        names=counts.keys(),
        color=counts.keys(),
        color_discrete_map={
            "Sentiment is Negative": "red",  # Negative in Red
            "Sentiment is Positive": "green",  # Positive in Green
            "No Sentiment": "blue",  # Neutral in Blue, or choose any other color
            "None": "gray",  # None in Gray, or choose any other color
        },
    )
    return fig


def streamlit_app():
    st.title("Muhtm Aspect Sentiment Analyzer")
    uploaded_file = st.file_uploader("Choose a CSV file", type="csv")

    if uploaded_file is not None:
        data = pd.read_csv(uploaded_file)

        if st.button("Predict"):
            # Display the number of reviews
            st.markdown(
                f"<div style='background-color: #EBF5FF; padding: 10px; border-radius: 10px;'>"
                f"<h3 style='margin: 0;'>Number of Reviews: {len(data)}</h3>"
                f"</div>",
                unsafe_allow_html=True,
            )

            aspect_predictions = make_predictions(data)
            general_predictions = make_general_predictions(data)

            if aspect_predictions and general_predictions:
                bar_chart = create_bar_chart(aspect_predictions)
                st.plotly_chart(bar_chart)

                # Combine all aspect predictions in one table
                for aspect in aspects:
                    data[f"{aspect}_Prediction"] = aspect_predictions[aspect]

                st.write(
                    data[["Reviews"] + [f"{aspect}_Prediction" for aspect in aspects]]
                )

                # Create and Display Pie Chart
                pie_chart = create_pie_chart(general_predictions)
                st.plotly_chart(pie_chart)

            else:
                st.error("Unable to make predictions. Please check the uploaded data.")


if __name__ == "__main__":
    streamlit_app()
