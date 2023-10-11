# serializers.py
from rest_framework import serializers
from .models import Dataset, AnalyzedDataset

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ['user', 'dataset', 'date', 'store_category']
        read_only_fields = ['user', 'date']


class AnalyzedDatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyzedDataset
        fields = '__all__'


