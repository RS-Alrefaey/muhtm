
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import  DatasetCreateAPI, AnalyzedDatasetListAPI, AnalyzedDatasetDetailsView

app_name = 'business'

urlpatterns = [
# root
    path('upload/', DatasetCreateAPI.as_view(), name='dataset-upload'),
    path('history/', AnalyzedDatasetListAPI.as_view(), name='analyzed-list'),
    path('history/<int:pk>/', AnalyzedDatasetDetailsView.as_view(), name='analyzed-dataset-detail'),

]
