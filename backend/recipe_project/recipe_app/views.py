import json
from django.db.models import Q
from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
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
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = RecipeSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        img = request.FILES['img']
        recipe = json.loads(request.data['recipe'])
        recipe['img'] = img
        serializer = self.get_serializer(data=recipe)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    model = Recipe
    queryset = Recipe.objects.all() 
    serializer_class = RecipeSerializer

    permission_classes = [IsOwnerOrReadOnly]

    def update(self, request, *args, **kwargs):
        img = request.FILES['img']
        recipe = json.loads(request.data['recipe'])
        recipe['img'] = img
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=recipe, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class SearchView(views.APIView):
    def get(self, request, keyword, format=None):

        recipes = Recipe.objects.filter(Q(name__icontains=keyword) | Q(recipe_ingredient__ingredient__name__icontains=keyword)).distinct()
        serializer = RecipeSerializer(recipes, many=True,context={"request":request})
        return Response(serializer.data)

