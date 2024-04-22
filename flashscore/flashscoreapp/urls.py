from django.urls import include, path
from . import views

app_name = "flashscoreapp"
urlpatterns = [
    # ex: flashscore/
    path("", views.index, name='index'),

]