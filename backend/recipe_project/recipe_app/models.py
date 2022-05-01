from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=50, blank=False)
    
    def __str__(self):
        return "{}".format(self.name)
    
class Recipe (models.Model):
    created = models.DateTimeField(auto_now_add = True)

    name = models.CharField(max_length=50, blank=False)
    des = models.CharField(max_length=100, blank=False)
    serving = models.IntegerField(blank=False, null=False, default=1)
    detail = models.TextField(default="Please add detail instructions")

    ingredients = models.ManyToManyField(
        Ingredient,
        through='Recipe_Ingredient',
        through_fields=('recipe', 'ingredient')
    )

    def __str__(self):
        return "{}".format(self.name)


class Recipe_Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    quantity = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return "{} in {}".format(self.ingredient.name,self.recipe.name)