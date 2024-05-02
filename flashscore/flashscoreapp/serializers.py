from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import *

class NacionalidadeSerializer(serializers.ModelSerializer):
 class Meta:
    model = Nacionalidade
    fields = ('id','pais','nacionalidadeNome','bandeira')

class LigaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Liga
        fields = ('id', 'nomeDaLiga', 'nrMaxEquipasDaLiga', 'logoDaLiga')

class EquipaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipa
        fields = ('id','nomeDaEquipa', 'sigla', 'liga', 'logoDaEquipa')

class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = ('id','nomeDoJogador', 'nrDoJogador', 'dataDeNascimento', 'nacionalidadedoJogador', 'equipaDoJogador', 'fotoDoJogador')

class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogo
        fields = ('id','equipaDaCasa', 'equipaDeFora', 'horaDoJogo')

    def validate(self, data):
        equipa_casa = data['equipaDaCasa']
        equipa_fora = data['equipaDeFora']
        
        # Verifica se as ligas das equipas são iguais
        if equipa_casa.liga != equipa_fora.liga:
            raise ValidationError("As ligas das equipas devem ser iguais.")
        return data
