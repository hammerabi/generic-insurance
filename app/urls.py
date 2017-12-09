from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from my_app.models import *

#####################
## API serializers
#####################
class SampleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sample

        fields = (
            'name',
            'created_at',
            'updated_at',
            )

class SampleViewSet(viewsets.ModelViewSet):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer

router = routers.DefaultRouter()
router.register(r'sample', SampleViewSet)


####################
## App urls
####################

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
