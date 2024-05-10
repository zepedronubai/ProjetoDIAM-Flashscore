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

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .serializers import *
from rest_framework.permissions import AllowAny

# Create your views here.


def index(request):
    ligas = Liga.objects.all
    print(ligas)
    return render(request,"flashscoreapp/index.html",{'ligas':ligas})

#pedidos api

@api_view(['GET', 'POST'])
def nacionalidades(request):
    if request.method == 'GET':
        lista_questoes = Nacionalidade.objects.all()
        serializer = NacionalidadeSerializer(lista_questoes, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = NacionalidadeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def ligas(request):
    if request.method == 'GET':
        ligas = Liga.objects.all()
        serializer = LigaSerializer(ligas, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = LigaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def equipas(request):
    if request.method == 'GET':
        equipas = Equipa.objects.all()
        serializer = EquipaSerializer(equipas, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EquipaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def jogadores(request):
    if request.method == 'GET':
        jogadores = Jogador.objects.all()
        serializer = JogadorSerializer(jogadores, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = JogadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
def jogos(request):
    if request.method == 'GET':
        jogos = Jogo.objects.all()
        serializer = JogoSerializer(jogos, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        print("AIAIAIAIAIAIAIIAIAIAIAIA")
        print(request.data.get('equipaDaCasa'))
        serializer = JogoSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def jogo(request):
    if request.method == 'GET':
        jogos = Jogo.objects.all()
        serializer = OnlyOneJogoSerializer(jogos, context={'request': request},many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def ligasEJogos(request):
    date_param = request.GET.get('date', None)
    if date_param is None:
        return Response("Date parameter is required", status=status.HTTP_400_BAD_REQUEST)
    try:
        # Parse date parameter string to a datetime object
        target_date = timezone.datetime.strptime(date_param, '%Y-%m-%d').date()
    except ValueError:
        return Response("Invalid date format", status=status.HTTP_400_BAD_REQUEST)
    
    ligas = Liga.objects.all()
    data = []
    for liga in ligas:
        jogosDaLiga = Jogo.objects.filter(liga=liga, horaDoJogo__date=target_date)
        if (len(jogosDaLiga)>0):
            serializer = OnlyOneJogoSerializer(jogosDaLiga, many=True)
            liga_data = {
                'nomeDaLiga': liga.nomeDaLiga,
                'jogosDaLiga': serializer.data
            }
            data.append(liga_data)

    return Response(data)
    
@api_view(['GET'])
def liga(request, liga_id):
    try:
        liga = Liga.objects.get(id=liga_id)
    except Liga.DoesNotExist:
        return Response({'error': 'Liga not found'}, status=404)

    liga_serializer = LigaSerializer(liga)
    equipas = Equipa.objects.filter(liga=liga).order_by('-pontos')
    equipas_serializer = EquipaSerializer(equipas, many=True)

    response_data = {
        'liga': liga_serializer.data,
        'equipas': equipas_serializer.data
    }
    return Response(response_data)

@api_view(['GET'])
class userFavoritos(APIView):
    def get(self, request):
        user = request.user
        favoritos = Favoritos.objects.filter(user=user)
        equipas = [favorito.equipa for favorito in favoritos]
        serializer = EquipaSerializer(equipas, many=True)
        return Response(serializer.data)

#!!!!!!!!!!!!!!!!!!!!!! NÃO ESQUECER MUDAR, E ADICIONAR PERMISSOES
@api_view(['DELETE'])
@permission_classes([AllowAny])      
def deleteLiga(self, id=None):
        try:
            liga = Liga.objects.get(pk=id)
        except Liga.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        liga.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#!!!!!!!!!!!!!!!!!!!!!! NÃO ESQUECER MUDAR, E ADICIONAR PERMISSOES
@api_view(['DELETE'])
@permission_classes([AllowAny])      
def deleteEquipa(self, id=None):
        try:
            liga = Equipa.objects.get(pk=id)
        except Equipa.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        liga.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#!!!!!!!!!!!!!!!!!!!!!! NÃO ESQUECER MUDAR, E ADICIONAR PERMISSOES
@api_view(['DELETE'])
@permission_classes([AllowAny])      
def deleteJogador(self, id=None):
        try:
            liga = Jogador.objects.get(pk=id)
        except Jogador.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        liga.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#!!!!!!!!!!!!!!!!!!!!!! NÃO ESQUECER MUDAR, E ADICIONAR PERMISSOES
@api_view(['DELETE'])
@permission_classes([AllowAny])      
def deleteJogo(self, id=None):
        try:
            liga = Jogo.objects.get(pk=id)
        except Jogo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        liga.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
