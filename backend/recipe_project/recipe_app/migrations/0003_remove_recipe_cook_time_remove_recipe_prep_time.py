# Generated by Django 4.0.4 on 2022-04-30 19:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0002_ingredient_recipe_cook_time_recipe_detail_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='cook_time',
        ),
        migrations.RemoveField(
            model_name='recipe',
            name='prep_time',
        ),
    ]
