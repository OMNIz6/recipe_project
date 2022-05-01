from django.db.models import Q
from rest_framework import generics, views
from rest_framework.response import Response
from recipe_app.models import Recipe, Ingredient
from recipe_app.serializers import RecipeSerializer, IngredientSerializer
from rest_auth.permissions import IsOwnerOrReadOnly

class IngredientView(generics.ListCreateAPIView):
    model = Ingredient
    queryset = Ingredient.objects.all() 
    serializer_class = IngredientSerializer

class RecipeView(generics.ListCreateAPIView):
    model = Recipe
    queryset = Recipe.objects.all() 
    serializer_class = RecipeSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = Recipe
    queryset = Recipe.objects.all() 
    serializer_class = RecipeSerializer

    permission_classes = [IsOwnerOrReadOnly]

class SearchView(views.APIView):
    def get(self, request, keyword, format=None):
        
        recipes = Recipe.objects.filter(Q(name__icontains=keyword) | Q(recipe_ingredient__ingredient__name__icontains=keyword)).distinct()
        print(recipes)
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)

