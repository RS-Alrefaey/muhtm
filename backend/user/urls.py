
from django.urls import path, re_path
from .views import UserCreateView, UserUpdateView, LoginAPI, UserProfileView

app_name = 'user'


urlpatterns = [
    path('signup/', UserCreateView.as_view(), name='signup'),
    path('update/<str:username>/', UserUpdateView.as_view(), name='update-user'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),

]