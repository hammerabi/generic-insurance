from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

# Helper for insurers to define their own choice (enum) fields
def choice_tuple(*given):
    ret = ()
    for choice in given:
        if isinstance(choice, (list, tuple)):
            ret = ret + (tuple(choice),)
            continue

        value = '_'.join(str(choice).lower().split())
        ret = ret + ((value, choice),)

    return ret
