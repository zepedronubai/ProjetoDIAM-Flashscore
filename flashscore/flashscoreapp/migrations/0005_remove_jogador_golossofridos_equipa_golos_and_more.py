# Generated by Django 5.0.3 on 2024-05-04 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flashscoreapp', '0004_jogador_golossofridos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jogador',
            name='golosSofridos',
        ),
        migrations.AddField(
            model_name='equipa',
            name='golos',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='equipa',
            name='golosSofridos',
            field=models.IntegerField(default=0),
        ),
    ]
