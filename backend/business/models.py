from django.db import models
from user.models import User
# Create your models here.

class StoreCategory(models.TextChoices):
    ELECTRONIC = 'ELECTRONIC', 'Electronic'
    CLOTHES = 'CLOTHES', 'Clothes'

class Dataset (models.Model):
    user = models.ForeignKey(User, on_delete=models.SET("Absent"), verbose_name=("Business Owner"), null=True)
    dataset = models.FileField(upload_to='datasets/', verbose_name=("Dataset"))
    date = models.DateField(auto_now_add=True, verbose_name= "Uploaded at")
    store_category = models.CharField(verbose_name=('Store category'),choices=StoreCategory.choices, max_length=10)


class AnalyzedDataset (models.Model):
    user = models.ForeignKey(User, on_delete=models.SET("Absent"), verbose_name=("Business Owner"), null=True)
    the_dataset = models.ForeignKey(Dataset, on_delete=models.SET("Absent"), verbose_name=("The dataset"), null=True)
    date = models.DateField(auto_now_add=True, verbose_name= "Created at")
    results = models.JSONField()

    def __str__(self):
        return f"{self.user.username} - Dataset ID: {self.id} - Date: {self.date}"


