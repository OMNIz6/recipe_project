from dataclasses import field
import json
from pyexpat import model
from pkg_resources import require
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
    img = serializers.ImageField(required=True)
    class Meta:
        model=Recipe
        depth=1
        fields=['id','name','des','servings','detail','ingredients','owner','img']
    
    def create(self, validated_data):
        print(validated_data)
        ingredients_data = validated_data.pop('recipe_ingredient_set')
        recipe = Recipe.objects.create(**validated_data)
        for recipe_ingredient_data in ingredients_data:
            ingredient_data = recipe_ingredient_data.pop('ingredient')

            ingredient = Ingredient.objects.filter(name=ingredient_data.get('name'))
            if ingredient:
                ingredient = Ingredient.objects.get(name=ingredient_data.get('name'))
            else:
                ingredient = Ingredient.objects.create(name=ingredient_data.get('name'))

            Recipe_Ingredient.objects.create(recipe=recipe,ingredient= ingredient, **recipe_ingredient_data)
        return recipe
        

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.des = validated_data.get('des')
        instance.servings = validated_data.get('servings')
        instance.detail = validated_data.get('detail')
        instance.img = validated_data.get('img')
        instance.save()
        ingredients_data = validated_data.pop('recipe_ingredient_set')
        Recipe_Ingredient.objects.filter(recipe=instance).delete()
        for recipe_ingredient_data in ingredients_data:
            ingredient_data = recipe_ingredient_data.pop('ingredient')
            ingredient = Ingredient.objects.get(name=ingredient_data.get('name'))
            if not ingredient:
                ingredient = Ingredient.objects.create(name=ingredient_data.get('name'))
            Recipe_Ingredient.objects.create(recipe=instance,ingredient= ingredient, **recipe_ingredient_data)
        print(instance.ingredients)
        return instance