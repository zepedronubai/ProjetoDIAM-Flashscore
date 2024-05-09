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
        fields = ('id','nomeDaEquipa', 'sigla', 'liga', 'logoDaEquipa','pontos','golos','golosSofridos')

class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = ('id','nomeDoJogador', 'nrDoJogador', 'dataDeNascimento', 'nacionalidadedoJogador', 'equipaDoJogador', 'fotoDoJogador','golos')

# class JogoSerializer(serializers.ModelSerializer):
#     equipaDaCasa = EquipaSerializer(read_only=True)
#     equipaDeFora = EquipaSerializer(read_only=True)
    
#     class Meta:
#         model = Jogo
#         fields = ('id','equipaDaCasa' ,'equipaDeFora','liga','horaDoJogo')

#     def validate(self, data):
#         print("AQUI MANO")
#         print(data)
#         equipa_casa = data['equipaDaCasa']
#         equipa_fora = data['equipaDeFora']
#         liga = data['liga']
#         print("LIGA MM DO JOGO" + str(liga))
#         # Verifica se as ligas das equipas são iguais
#         if equipa_casa['liga'] != equipa_fora['liga'] or equipa_casa['liga'] != liga or equipa_fora['liga'] != liga:
#             raise ValidationError("As ligas das equipas devem ser iguais.")
#         if equipa_casa == equipa_fora:
#             raise ValidationError("As equipas não podem ser iguais.")
#         return data
    

class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogo
        fields = ('id', 'equipaDaCasa', 'equipaDeFora', 'liga', 'horaDoJogo')

    def validate(self, data):
        equipa_da_casa = data['equipaDaCasa']
        equipa_de_fora = data['equipaDeFora']
        liga = data['liga']
        print(equipa_da_casa.liga)
        # Add custom validation logic here, if needed
        if equipa_da_casa.liga != equipa_de_fora.liga or equipa_da_casa.liga != liga or equipa_de_fora.liga != liga:
            raise ValidationError("As ligas das equipas devem ser iguais.")
        if equipa_da_casa == equipa_de_fora:
            raise ValidationError("As equipas não podem ser iguais.")

        return data
    
class OnlyOneJogoSerializer(serializers.ModelSerializer):
    equipaDaCasa = EquipaSerializer()
    equipaDeFora = EquipaSerializer()
    
    class Meta:
        model = Jogo
        fields = ('id', 'equipaDaCasa', 'equipaDeFora', 'liga', 'horaDoJogo')
