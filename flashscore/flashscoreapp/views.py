from django.core.mail.backends import console
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import Liga,Equipa,Jogador,Nacionalidade
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

import datetime
import os

from django.utils import timezone


from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test

from django.core.files.storage import FileSystemStorage


# Create your views here.


def index(request):
    ligas = Liga.objects.all
    print(ligas)
    return render(request,"flashscoreapp/index.html",{'ligas':ligas})


class LoginView(APIView):
    def post(self, request):

         username = request.data.get('username')
         password = request.data.get('password')
         user = authenticate(username=username, password=password)
         if user:
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'token': token.key})
         else:
             return JsonResponse({'error': 'Credenciais inválidas'}, status=400)


def registarutilizador(request):
    nacionalidade = Nacionalidade.objects.all
    equipa = Equipa.objects.all

    if request.method == 'POST':
            user = User.objects.create_user(username=request.POST['name'],
                                            password=request.POST['password'])
            ut = Jogador(user=user, equipaDoJogador=request.POST['equipaDoJogador'], nacionalidadedoJogador=request.POST.get('nacionalidadedoJogador'), dataDeNascimento=request.POST['dataDeNascimento'],
                            nrDoJogador=request.POST['nrDoJogador'])
            ut.save()
            login(request, user)
            return HttpResponseRedirect(reverse('flashscoreapp:index'))
    else:
            return render(request, 'flashscoreapp/registarutilizador.html',{'equipas': equipa, 'nacionalidades': nacionalidade})

def paginapessoal(request):
    return render(request, 'flashscoreapp/paginapessoal.html')

def fazer_upload(request):
 if request.method == 'POST' and request.FILES['myfile']:
    username = request.user.id
    file_extension = ".png"
    stri = str(username) + file_extension
    print(username)
    myfile = request.FILES['myfile']
    fs = FileSystemStorage()
    filename = fs.save(stri, myfile)
    uploaded_file_url = fs.url(filename)
    return render(request, 'flashscoreapp/fazer_upload.html', {'uploaded_file_url': uploaded_file_url})
 return render(request,'flashscoreapp/fazer_upload.html')








def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('flashscoreapp:index'))


def login_view(request):
    if request.method == 'POST':
        username = request.POST['name']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('flashscoreapp:index'))
        else:
            return render(request, 'flashscoreapp/login.html')
    else:
        return render(request, 'flashscoreapp/login.html')

def voltar(request):
    return render(request, 'flashscoreapp/index.html')

def voto_check(user):
 return user.is_superuser
@user_passes_test(voto_check, login_url='flashscoreapp:index')
def criar_equipa(request):
    liga = Liga.objects.all
    return render(request, 'flashscoreapp/criar.html',{'ligas': liga})

def salvar_equipa(request):
    if request.method == 'POST':

        nova_questao = Equipa(nomeDaEquipa=request.POST.get('nomeDaEquipa'), sigla=request.POST.get('sigla'), liga=request.POST.get('liga'))
        nova_questao.save()

        return render(request,'flashscoreapp/index.html')

def criar_liga(request):
    return render(request, 'flashscoreapp/criar_liga.html',)

def salvar_liga(request):
    if request.method == 'POST':

        nova_liga = Liga(nomeDaLiga=request.POST.get('nomeDaLiga'), nrMaxEquipasDaLiga=request.POST.get('nrMaxEquipasDaLiga'))
        nova_liga.save()

        return HttpResponseRedirect(reverse('flashscoreapp:index'))
