# Generated by Django 4.0.4 on 2022-05-03 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0008_alter_recipe_des'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe_ingredient',
            name='quantity',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]