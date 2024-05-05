from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import datetime

class Nacionalidade(models.Model):
    pais = models.CharField(max_length=200)
    nacionalidadeNome = models.CharField(max_length=200)
    bandeira = models.CharField(default="",max_length=1000)

class Liga(models.Model):
    nomeDaLiga = models.CharField(max_length=200)
    nrMaxEquipasDaLiga = models.IntegerField(default=10)
    logoDaLiga = models.CharField(default="",max_length=1000)
    
class Equipa(models.Model):
    nomeDaEquipa = models.CharField(max_length=200)
    sigla = models.CharField(max_length=10)
    liga = models.ForeignKey(Liga, on_delete=models.CASCADE)
    logoDaEquipa = models.CharField(default="",max_length=1000)
    pontos = models.IntegerField(default=0)
    golos = models.IntegerField(default=0)
    golosSofridos = models.IntegerField(default=0)


class Jogador(models.Model):
    nrDoJogador = models.IntegerField()
    dataDeNascimento = models.DateTimeField()
    nacionalidadedoJogador = models.ForeignKey(Nacionalidade, on_delete=models.CASCADE)
    equipaDoJogador = models.ForeignKey(Equipa, on_delete=models.CASCADE)
    fotoDoJogador = models.CharField(default="",max_length=1000)
    golos = models.IntegerField(default=0)
    
class Jogo(models.Model):
    equipaDaCasa = models.ForeignKey(Equipa, on_delete=models.CASCADE, related_name='jogos_casa')
    equipaDeFora = models.ForeignKey(Equipa, on_delete=models.CASCADE,  related_name='jogos_fora')
    liga = models.ForeignKey(Liga, on_delete=models.CASCADE, default=1)
    horaDoJogo = models.DateTimeField()

