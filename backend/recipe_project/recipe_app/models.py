from django.db import models

class recipe (models.Model):
    created = models.DateTimeField(auto_now_add = True)
    name = models.CharField(max_length=50, blank=False)
    des = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return "{}".format(self.name)