
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Dataset, AnalyzedDataset
from .serializers import DatasetSerializer, AnalyzedDatasetSerializer
from .utilities import process_uploaded_file_and_save
from rest_framework.permissions import IsAuthenticated


# class DatasetCreateAPI(generics.CreateAPIView):
#     queryset = Dataset.objects.all()
#     serializer_class = DatasetSerializer
#     permission_classes = [IsAuthenticated]
#
#
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

class DatasetCreateAPI(generics.CreateAPIView):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        analyzed_dataset = process_uploaded_file_and_save(
            uploaded_file=instance.dataset,
            dataset_instance=instance,
            user=request.user,
        )

        # Return the results along with the response
        analyzed_data_serializer = AnalyzedDatasetSerializer(analyzed_dataset)
        response_data = {
            "dataset": serializer.data,
            "analyzed_data": analyzed_data_serializer.data,
        }
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()




class AnalyzedDatasetListAPI(generics.ListAPIView):
    serializer_class = AnalyzedDatasetSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get_queryset(self):
        return AnalyzedDataset.objects.filter(user=self.request.user)


class AnalyzedDatasetDetailsView(generics.RetrieveAPIView):
    queryset = AnalyzedDataset.objects.all()
    serializer_class = AnalyzedDatasetSerializer



# @csrf_exempt
# def generate_csv(request):
#     if request.method == 'POST':
#         uploaded_file = request.FILES['csv']
#         data = pd.read_csv(uploaded_file)
#
#         # Perform aspect predictions
#         aspect_predictions = make_predictions(data)
#         general_predictions = make_general_predictions(data)
#
#         # Combine all aspect predictions in one table
#         for aspect in aspects:
#             data[f"{aspect}_Prediction"] = aspect_predictions[aspect]
