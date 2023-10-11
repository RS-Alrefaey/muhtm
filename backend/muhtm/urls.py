
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls'), name='user'),
    path('dashboard/', include('business.urls'), name='business'),

]
