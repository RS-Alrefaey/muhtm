from rest_framework import serializers
from .models import User, ContactTicket
from django.contrib.auth import authenticate



class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        error_messages={
            'unique': "اسم المستخدم مأخوذ"
        }
    )
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}


    def validate(self, data):
        username = data.get("username")

        if not self.instance or (self.instance and self.instance.username != username):
            if User.objects.filter(username=username).exists():
                raise serializers.ValidationError({"username": "اسم المستخدم مأخوذ بالفعل"})

        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        if 'last_name' not in validated_data or not validated_data['last_name']:
            validated_data['last_name'] = "DefaultLastName"
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


class ContactTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactTicket
        fields = ['name', 'email', 'phone_number', 'msg_content']