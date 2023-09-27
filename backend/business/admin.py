from django.contrib import admin
from .models import Dataset, AnalyzedDataset
# Register your models here.


admin.site.register(Dataset)
admin.site.register(AnalyzedDataset)