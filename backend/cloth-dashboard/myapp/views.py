#from django.shortcuts import render

# Create your views here.
# views.py
from django.shortcuts import render, redirect
from .forms import UploadFileForm
from .sentiment_analysis import make_general_predictions
import pandas as pd
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.http import HttpResponse



def upload_file_view(request):

    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            
            # Ensure the uploaded file is in CSV format
            if not file.name.endswith('.csv'):
                messages.error(request, 'File is not CSV type')
                return HttpResponseRedirect(reverse("myapp:upload_file"))

            # Load the CSV into a DataFrame
            df = pd.read_csv(file)

            # Apply the sentiment analysis
            try:
                sentiments = make_general_predictions(df)
                df['Sentiments'] = sentiments
            except Exception as e:
                # Handle any exceptions that occur during sentiment analysis
                messages.error(request, 'Error occurred during sentiment analysis: ' + str(e))
                return HttpResponseRedirect(reverse("myapp:upload_file"))

            # Convert the modified DataFrame to a CSV string
            csv_string = df.to_csv(index=False)

            # Create a response object with the CSV string as content
            response = HttpResponse(csv_string, content_type='text/csv')
            response['Content-Disposition'] = 'attachment; filename="sentiment_results.csv"'
            return response
            
    else:
        form = UploadFileForm()
    
    return render(request, 'upload.html', {'form': form})


def results_view(request):
    return render(request, 'results.html')

def home(request):
    return render(request, 'home.html')

import pandas as pd
import matplotlib.pyplot as plt
import io
from django.http import FileResponse

def generate_graph(request):
    # Reading the CSV
    df = pd.read_csv('sentiment_results.csv')

    # Assuming there's a column named 'result' with sentiment values: Positive, Negative, Neutral
    sentiment_counts = df['result'].value_counts()

    # Plot
    fig, ax = plt.subplots()
    ax.pie(sentiment_counts, labels=sentiment_counts.index, autopct='%1.1f%%', startangle=90)
    ax.axis('equal')  # Equal aspect ratio ensures the pie is drawn as a circle.

    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    return FileResponse(buf, as_attachment=True, filename='plot.png')


def plot_graph(request):
    # Generate the data and the plot
    # For the sake of example, I'm just plotting a basic graph
    plt.figure(figsize=(10,5))
    plt.plot([1,2,3,4,5], [2,3,1,5,6])
    plt.title('Sample Graph')
    
    # Save the generated plot to a BytesIO object instead of file
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.clf()  # Clear the current figure
    buf.seek(0)
    
    # Serve the image content directly for embedding on the webpage
    return HttpResponse(buf.getvalue(), content_type="image/png")