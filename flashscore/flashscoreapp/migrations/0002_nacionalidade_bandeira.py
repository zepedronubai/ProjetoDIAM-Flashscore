# Generated by Django 5.0.3 on 2024-04-21 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('flashscoreapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='nacionalidade',
            name='bandeira',
            field=models.CharField(default='', max_length=1000),
        ),
    ]
