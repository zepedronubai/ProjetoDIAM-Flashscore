from django.urls import path
from .views import *
from . import views



app_name = "flashscoreapp"
urlpatterns = [

    path("bla/", views.index, name='index'),
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
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
    path('api/check-auth/', check_auth, name='check_auth'),


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


    # flashapi/
    path("nacionalidades", views.nacionalidades),
    path("ligas", views.ligas),
    path("equipas", views.equipas),
    path("jogadores", views.jogadores),
    path("jogos", views.jogos),
    path('todosJogos', views.todosJogos),
    path("ligasejogos",views.ligasEJogos),
    path("liga/<int:liga_id>", views.liga),
    path("jogador/<int:jogador_id>", views.jogador),
    path("deleteLiga/<int:id>/", views.deleteLiga),
    path("deleteEquipa/<int:id>/", views.deleteEquipa),
    path("deleteJogador/<int:id>/", views.deleteJogador),
    path("deleteJogo/<int:id>/", views.deleteJogo),
    path("equipa/<int:equipa_id>", views.equipa),
    path('profile/<str:username>/', views.profile, name='login'),
    path('api/register/', views.registerViewZe, name='register'),
    path('favoritos/', views.userFavoritos),





]