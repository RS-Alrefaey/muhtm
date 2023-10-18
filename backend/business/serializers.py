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


class ChartAnalyzedDatasetSerializer(serializers.ModelSerializer):
    size_positive = serializers.SerializerMethodField()
    size_negative = serializers.SerializerMethodField()
    color_positive = serializers.SerializerMethodField()
    color_negative = serializers.SerializerMethodField()
    style_positive = serializers.SerializerMethodField()
    style_negative = serializers.SerializerMethodField()
    fabric_positive = serializers.SerializerMethodField()
    fabric_negative = serializers.SerializerMethodField()
    general_positive = serializers.SerializerMethodField()
    general_negative = serializers.SerializerMethodField()
    total_reviews = serializers.SerializerMethodField()

    class Meta:
        model = AnalyzedDataset
        fields = [
            'size_positive', 'size_negative',
            'color_positive', 'color_negative',
            'style_positive', 'style_negative',
            'fabric_positive', 'fabric_negative',
            'general_positive', 'general_negative',
            'total_reviews'
        ]

    def get_field_positive(self, obj, field_name):
        return obj.results.get('statistics', {}).get(f'{field_name}_stats', {}).get('positive', None)

    def get_field_negative(self, obj, field_name):
        return obj.results.get('statistics', {}).get(f'{field_name}_stats', {}).get('negative', None)

    get_size_positive = lambda self, obj: self.get_field_positive(obj, 'size')
    get_size_negative = lambda self, obj: self.get_field_negative(obj, 'size')
    get_color_positive = lambda self, obj: self.get_field_positive(obj, 'color')
    get_color_negative = lambda self, obj: self.get_field_negative(obj, 'color')
    get_style_positive = lambda self, obj: self.get_field_positive(obj, 'style')
    get_style_negative = lambda self, obj: self.get_field_negative(obj, 'style')
    get_fabric_positive = lambda self, obj: self.get_field_positive(obj, 'fabric')
    get_fabric_negative = lambda self, obj: self.get_field_negative(obj, 'fabric')
    get_general_positive = lambda self, obj: self.get_field_positive(obj, 'general')
    get_general_negative = lambda self, obj: self.get_field_negative(obj, 'general')

    def get_total_reviews(self, obj):
        return obj.results.get('statistics', {}).get('total_reviews', None)


class AnalyzedDatasetRetrieveSerializer(serializers.ModelSerializer):
    store_category = serializers.CharField(source="the_dataset.store_category")
    general_positive_percentage = serializers.SerializerMethodField()

    class Meta:
        model = AnalyzedDataset
        fields = ('id', 'store_category', 'date', 'general_positive_percentage')

    def get_field_positive(self, obj, field_name):
        return obj.results.get('statistics', {}).get(f'{field_name}_stats', {}).get('positive', None)

    def get_field_negative(self, obj, field_name):
        return obj.results.get('statistics', {}).get(f'{field_name}_stats', {}).get('negative', None)

    def get_general_positive_percentage(self, obj):
        positive = self.get_field_positive(obj, 'general')
        negative = self.get_field_negative(obj, 'general')

        if positive is None or negative is None:
            return None

        # Calculate the percentage
        total = positive + negative
        if total == 0:
            return 0
        return (positive / total) * 100
