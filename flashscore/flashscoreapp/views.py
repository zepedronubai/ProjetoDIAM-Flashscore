from django.http import HttpResponse
from django.shortcuts import render
from .models import Liga,Equipa,Jogador,Nacionalidade


# Create your views here.


def index(request):
    ligas = Liga.objects.all
    print(ligas)
    return render(request,"./index.html",{'ligas':ligas})


