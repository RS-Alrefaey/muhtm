
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Dataset, AnalyzedDataset
from .serializers import DatasetSerializer, AnalyzedDatasetSerializer, ChartAnalyzedDatasetSerializer, \
    AnalyzedDatasetRetrieveSerializer
from .utilities import process_uploaded_file_and_save
from rest_framework.permissions import IsAuthenticated
from django.db.models import Max

import base64
import io
from django.http import FileResponse
from rest_framework.parsers import JSONParser
from PIL import Image
from reportlab.pdfgen import canvas



class DatasetCreateAPI(generics.CreateAPIView):
    ''' this is for create and upload'''
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        analyzed_dataset = process_uploaded_file_and_save(
            uploaded_file=instance.dataset,
            dataset_instance=instance,
            user=request.user,
        )

        # Return the results along with the response
        analyzed_data_serializer = AnalyzedDatasetSerializer(analyzed_dataset)
        response_data = {
            "dataset": serializer.data,
            "analyzed_data": analyzed_data_serializer.data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()




class AnalyzedDatasetListAPI(generics.ListAPIView):
    ''' this is for history list'''
    serializer_class = AnalyzedDatasetRetrieveSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        return AnalyzedDataset.objects.filter(user=self.request.user).order_by('-date')


class AnalyzedDatasetChartsView(generics.RetrieveAPIView):
    ''' this is for charts'''
    queryset = AnalyzedDataset.objects.all()
    serializer_class = ChartAnalyzedDatasetSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HasPreviousAnalysis(APIView):
    def get(self, request):
        user = request.user

        try:
            latest_date = AnalyzedDataset.objects.filter(user=user).aggregate(Max('date'))['date__max']
            most_recent_analysis = AnalyzedDataset.objects.filter(user=user, date=latest_date).order_by('-id').first()
            serializer = ChartAnalyzedDatasetSerializer(most_recent_analysis)

            response_data = {
                "has_previous_analysis": True,
                "analysis_data": serializer.data,
                "analysis_date": most_recent_analysis.date  # Send the date as a date object
            }
        except AnalyzedDataset.DoesNotExist:
            response_data = {
                "has_previous_analysis": False,
                "message": "No previous analysis found"
            }

        return Response(response_data)





class SaveToPDFView(APIView):
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        image_data = request.data.get('image')
        if not image_data:
            return Response({'error': 'Image data not provided'}, status=status.HTTP_400_BAD_REQUEST)

        _, imgstr = image_data.split(';base64,')
        image = Image.open(io.BytesIO(base64.b64decode(imgstr)))

        buffer = io.BytesIO()
        c = canvas.Canvas(buffer, pagesize=(800, 600))

        aspect_ratio = image.width / image.height
        new_width = 700
        new_height = new_width / aspect_ratio

        if new_height > 500:
            new_height = 500
            new_width = new_height * aspect_ratio

        x = (800 - new_width) / 2
        y = (600 - new_height) / 2

        c.drawInlineImage(image, x, y, width=new_width, height=new_height)
        c.save()
        buffer.seek(0)

        return FileResponse(buffer, as_attachment=True, filename='analysis.pdf')
