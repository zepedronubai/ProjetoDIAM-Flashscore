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

class Jogador(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nrDoJogador = models.IntegerField()
    dataDeNascimento = models.DateTimeField()
    nacionalidadedoJogador = models.ForeignKey(Nacionalidade, on_delete=models.CASCADE)
    equipaDoJogador = models.ForeignKey(Equipa, on_delete=models.CASCADE)
    fotoDoJogador = models.CharField(default="",max_length=1000)

