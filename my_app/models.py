from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

#You can use this for fields with pre-determined options
def choice_tuple(*given):
    ret = ()
    for choice in given:
        if isinstance(choice, (list, tuple)):
            ret = ret + (tuple(choice),)
            continue

        value = '_'.join(str(choice).lower().split())
        ret = ret + ((value, choice),)

    return ret

class Sample(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
