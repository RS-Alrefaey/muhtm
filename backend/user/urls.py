
from django.urls import path, re_path
from .views import UserCreateView, LoginAPI, UserProfileView, UserUpdateAPIView

app_name = 'user'


urlpatterns = [
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('update/', UserUpdateAPIView.as_view(), name='update-user'),

]