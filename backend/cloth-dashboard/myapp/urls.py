from django.urls import path
from . import views

urlpatterns = [
    path('', views.upload_file_view, name='default_view'),
    path('upload/', views.upload_file_view, name='upload_file'),
    path('results/', views.results_view, name='results'),
    path('graph/', views.generate_graph, name='generate_graph'),
    path('plot_graph/', views.plot_graph, name='plot_graph'),
]