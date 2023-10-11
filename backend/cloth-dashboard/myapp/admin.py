from django.contrib import admin

# Register your models here.
# admin.py
from .models import UploadedFile

@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    list_display = ['file', 'id']  # Adjust this to show the fields you want in the admin list view
