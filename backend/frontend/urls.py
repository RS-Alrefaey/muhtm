from django.urls import path
from . import views

urlpatterns = [
    # ... other URL patterns ...
    path('generate-json/', views.generate_json, name='generate_json'),
]
