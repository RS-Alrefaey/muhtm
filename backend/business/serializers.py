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

    quality_positive = serializers.SerializerMethodField()
    quality_negative = serializers.SerializerMethodField()
    price_positive = serializers.SerializerMethodField()
    price_negative = serializers.SerializerMethodField()
    usage_positive = serializers.SerializerMethodField()
    usage_negative = serializers.SerializerMethodField()

    class Meta:
        model = AnalyzedDataset
        fields = [
            'size_positive', 'size_negative',
            'color_positive', 'color_negative',
            'style_positive', 'style_negative',
            'fabric_positive', 'fabric_negative',
            'general_positive', 'general_negative',
            'total_reviews',
            'quality_positive', 'quality_negative',
            'price_positive', 'price_negative',
            'usage_positive', 'usage_negative',
        ]

    def to_representation(self, instance):
        if instance.the_dataset.store_category == "CLOTHES":
            return self.clothes_representation(instance)
        elif instance.the_dataset.store_category == "ELECTRONIC":
            return self.electronic_representation(instance)
        else:
            return super().to_representation(instance)

    def clothes_representation(self, instance):
        return {
            'size_positive': self.get_field_positive(instance, 'size'),
            'size_negative': self.get_field_negative(instance, 'size'),
            'color_positive': self.get_field_positive(instance, 'color'),
            'color_negative': self.get_field_negative(instance, 'color'),
            'style_positive': self.get_field_positive(instance, 'style'),
            'style_negative': self.get_field_negative(instance, 'style'),
            'fabric_positive': self.get_field_positive(instance, 'fabric'),
            'fabric_negative': self.get_field_negative(instance, 'fabric'),
            'general_positive': self.get_field_positive(instance, 'general'),
            'general_negative': self.get_field_negative(instance, 'general'),
            'total_reviews': self.get_total_reviews(instance)
        }

    def electronic_representation(self, instance):
        return {
            'size_positive': self.get_field_positive(instance, 'Size'),
            'size_negative': self.get_field_negative(instance, 'Size'),
            'quality_positive': self.get_field_positive(instance, 'Quality'),
            'quality_negative': self.get_field_negative(instance, 'Quality'),
            'price_positive': self.get_field_positive(instance, 'Price'),
            'price_negative': self.get_field_negative(instance, 'Price'),
            'usage_positive': self.get_field_positive(instance, 'Usage'),
            'usage_negative': self.get_field_negative(instance, 'Usage'),
            'general_positive': self.get_field_positive(instance, 'General'),
            'general_negative': self.get_field_negative(instance, 'General'),
            'total_reviews': self.get_total_reviews(instance)
        }

    def get_field_positive(self, obj, field_name):
        return obj.results.get('statistics', {}).get(f'{field_name}_stats', {}).get('positive', None)

    def get_field_negative(self, obj, field_name):
        return obj.results.get('statistics', {}).get(f'{field_name}_stats', {}).get('negative', None)

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
