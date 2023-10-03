import streamlit as st
import pandas as pd
from preprocessing import *  # Ensure that transform_tfidf function is here or import it explicitly
import pickle
import plotly.express as px  # Import Plotly Express for visualization
import datetime
import streamlit.components.v1 as components


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
    
    # Page configurations
    st.set_page_config(
        page_title="Muhtm ASBA",
        page_icon="📊",
        layout="wide"
    )

    # Page header
    st.title("Muhtm Aspect Based Sntiment Analysis")

    # Initialize session state variable for data
    if "data_loaded" not in st.session_state:
        st.session_state.data_loaded = False

    # Only show the file uploader if data isn't loaded yet
    if not st.session_state.data_loaded:
        uploaded_file = st.file_uploader("Choose a CSV file", type="csv")
        
        if uploaded_file is not None:
            data = pd.read_csv(uploaded_file)
            st.session_state.data = data
            st.session_state.data_loaded = True

            # Capture the timestamp when the file is uploaded
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            # Display the timestamp on the Streamlit dashboard
            st.markdown(
                f"<div style='background-color: #EBF5FF; padding: 10px; border-radius: 10px;'>"
                f"<h4 style='margin: 0;'>File uploaded on: {timestamp}</h4>"
                f"</div>",
                unsafe_allow_html=True,
            )
    else:
        # Use the stored data for further processing
        data = st.session_state.data

    if st.button("Predict"):
        aspect_predictions = make_predictions(data)
        general_predictions = make_general_predictions(data)

        if aspect_predictions and general_predictions:
            
            # Create layout for number of reviews and pie chart
            col1, col2 = st.columns(2)
            
            # Display number of reviews in the left column (col1)
            with col1:
                st.markdown(
                    f"<div style='background-color: #EBF5FF; padding: 10px; border-radius: 10px;'>"
                    f"<h4 style='margin: 0;'>Number of Reviews: {len(data)}</h4>"
                    f"</div>",
                    unsafe_allow_html=True,
                )
            
            # Create and Display Pie Chart in the right column (col2)
            pie_chart = create_pie_chart(general_predictions)
            with col2:
                st.plotly_chart(pie_chart)

            # Display Bar Chart below the number of reviews and pie chart
            bar_chart = create_bar_chart(aspect_predictions)
            st.plotly_chart(bar_chart, use_container_width=True)

            # Combine all aspect predictions in one table
            for aspect in aspects:
                data[f"{aspect}_Prediction"] = aspect_predictions[aspect]

            # Add general predictions as a new column to data
            data["General_Prediction"] = general_predictions  
            
            # Including the new "General_Prediction" column in the displayed table
            st.write(
                data[
                    ["Reviews"] 
                    + [f"{aspect}_Prediction" for aspect in aspects]
                    + ["General_Prediction"] 
                ]
            )

        else:
            st.error("Unable to make predictions. Please check the uploaded data.")


if __name__ == "__main__":
    streamlit_app()