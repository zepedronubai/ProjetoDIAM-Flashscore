from django.urls import path
from .views import LoginView
from . import views



app_name = "flashscoreapp"
urlpatterns = [

    path("", views.index, name='index'),
    path('registarutilizador/', views.registarutilizador, name='registarutilizador'),
    path('login', views.login_view, name='login_view'),
    path('logout', views.logout_view, name='logout_view'),
    path('voltar', views.voltar, name='voltar'),
    path("paginapessoal", views.paginapessoal, name='paginapessoal'),
    path('fazer_upload', views.fazer_upload,name='fazer_upload'),
    path('criar/', views.criar_equipa, name='criar'),
    path('salvar_equipa/', views.salvar_equipa, name='salvar_equipa'),
    path('criar_liga/', views.criar_liga, name='criar_liga'),
    path('salvar_liga/', views.salvar_liga, name='salvar_liga'),


]