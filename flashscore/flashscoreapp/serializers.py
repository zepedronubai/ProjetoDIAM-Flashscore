from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import *


class NacionalidadeSerializer(serializers.ModelSerializer):
 class Meta:
    model = Nacionalidade
    fields = ('id','pais','nacionalidadeNome','bandeira')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']  # Add other fields as needed
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LigaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Liga
        fields = ('id', 'nomeDaLiga', 'nrMaxEquipasDaLiga', 'logoDaLiga')

class EquipaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipa
        fields = ('id','nomeDaEquipa', 'sigla', 'liga', 'logoDaEquipa','pontos','golos','golosSofridos')

class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = ('id','nomeDoJogador', 'nrDoJogador', 'dataDeNascimento', 'nacionalidadedoJogador', 'equipaDoJogador', 'fotoDoJogador','golos')

class JogoSerializer(serializers.ModelSerializer):
    equipaDaCasa = EquipaSerializer()
    equipaDeFora = EquipaSerializer()
    class Meta:
        model = Jogo
        fields = ('id','equipaDaCasa','liga' ,'equipaDeFora','horaDoJogo')

    def validate(self, data):
        equipa_casa = data['equipaDaCasa']
        equipa_fora = data['equipaDeFora']
        liga = data['liga']
        
        # Verifica se as ligas das equipas são iguais
        if equipa_casa.liga != equipa_fora.liga or equipa_casa.liga!=liga or equipa_fora.liga!=liga :
            raise ValidationError("As ligas das equipas devem ser iguais.")
        return data
