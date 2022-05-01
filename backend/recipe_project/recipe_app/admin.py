from django.contrib import admin
from recipe_app.models import Recipe, Ingredient, Recipe_Ingredient
# Register your models here.
@admin.register(Recipe,Ingredient,Recipe_Ingredient)
class UserAdmin (admin.ModelAdmin):
    pass