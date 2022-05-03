from django.urls import path, include
from recipe_app.views import IngredientView, RecipeView, SearchView, RecipeDetailView

urlpatterns = [
    path(r'ingredients/', IngredientView.as_view()),
    path(r'recipes/', RecipeView.as_view()),
    path(r'recipe/<int:pk>/', RecipeDetailView.as_view()),
    path(r'search/<str:keyword>/', SearchView.as_view()),
    ]