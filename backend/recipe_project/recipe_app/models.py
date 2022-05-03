from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=50, blank=False)
    
    def __str__(self):
        return "{}".format(self.name)

def upload_to(instance, filename):
        return 'images/{filename}'.format(filename=filename)

class Recipe (models.Model):
    
    created = models.DateTimeField(auto_now_add = True)

    name = models.CharField(max_length=50, blank=False)
    des = models.TextField(blank=False)
    servings = models.IntegerField(blank=False, null=False, default=1)
    detail = models.TextField(default="Please add detail instructions")
    img = models.ImageField(upload_to=upload_to, blank=True, null=True)
    owner = models.ForeignKey('auth.user',related_name='recipes',on_delete=models.CASCADE, null=True)

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

    quantity = models.CharField(max_length=50,blank=True)

    def __str__(self):
        return "{} in {}".format(self.ingredient.name,self.recipe.name)