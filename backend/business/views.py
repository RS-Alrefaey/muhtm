
from rest_framework import generics
from .models import Dataset, AnalyzedDataset
from .serializers import DatasetSerializer, AnalyzedDatasetSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
import requests


class DatasetCreateAPI(generics.CreateAPIView):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AnalyzedDatasetListAPI(generics.ListAPIView):
    serializer_class = AnalyzedDatasetSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        return AnalyzedDataset.objects.filter(user=self.request.user)


class AnalyzedDatasetDetailsView(generics.RetrieveAPIView):
    queryset = AnalyzedDataset.objects.all()
    serializer_class = AnalyzedDatasetSerializer