from django.urls import path
from . import views

urlpatterns = [
    path('generate-json/', views.generate_json, name='generate_json'),
]

