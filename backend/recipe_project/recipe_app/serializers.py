from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from recipe_app.models import Ingredient, Recipe, Recipe_Ingredient
from rest_auth.serializers import UserSerialzer

class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model=Ingredient
        fields=['name']

class Recipe_IngredientSerializer(serializers.ModelSerializer):
    recipe_name = serializers.ReadOnlyField(source='recipe.name')
    ingredient_name = serializers.CharField(source='ingredient.name')

    class Meta:
        model=Recipe_Ingredient
        fields=['id','ingredient_name','recipe_name','quantity']


class RecipeSerializer(serializers.ModelSerializer):

    ingredients = Recipe_IngredientSerializer(source='recipe_ingredient_set', many=True)
    owner = UserSerialzer(read_only=True)
    detail = serializers.CharField(required=True,allow_null=False)
    class Meta:
        model=Recipe
        depth=1
        fields=['id','name','des','serving','detail','ingredients','owner']
    
    def create(self, validated_data):
        ingredients_data = validated_data.pop('recipe_ingredient_set')
        recipe = Recipe.objects.create(**validated_data)
        for recipe_ingredient_data in ingredients_data:
            ingredient_data = recipe_ingredient_data.pop('ingredient')
            ingredient = Ingredient.objects.filter(name=ingredient_data)
            if not ingredient:
                ingredient = Ingredient.objects.create(name=ingredient_data.get('name'))
            Recipe_Ingredient.objects.create(recipe=recipe,ingredient= ingredient, **recipe_ingredient_data)
        return recipe