from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate



class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        error_messages={
            'unique': "اسم المستخدم مأخوذ"
        }
    )
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'store_link', 'password')
        extra_kwargs = {'password': {'write_only': True}}


    def validate(self, data):
        username = data.get("username")

        if username and User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "اسم المستخدم مأخوذ بالفعل"})
        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            if not User.objects.filter(username=username).exists():
                raise serializers.ValidationError({"username": "اسم المستخدم غير صحيح"})

            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User is deactivated.")
                return {"user": user}
            raise serializers.ValidationError({"password": "كلمة المرور غير صحيحة"})
        raise serializers.ValidationError("Must include 'username' and 'password'.")

