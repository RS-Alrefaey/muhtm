
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Dataset, AnalyzedDataset
from .serializers import DatasetSerializer, AnalyzedDatasetSerializer, ChartAnalyzedDatasetSerializer, \
    AnalyzedDatasetRetrieveSerializer
from .utilities import process_uploaded_file_and_save
from rest_framework.permissions import IsAuthenticated


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
        return AnalyzedDataset.objects.filter(user=self.request.user)


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
            most_recent_analysis = AnalyzedDataset.objects.filter(user=user).latest('date')
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


