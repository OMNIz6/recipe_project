# Generated by Django 4.0.4 on 2022-05-02 18:14

from django.db import migrations, models
import recipe_app.models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0004_recipe_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=recipe_app.models.upload_to),
        ),
    ]