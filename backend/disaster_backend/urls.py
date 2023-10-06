from django.urls import path, reverse_lazy
from django.views.generic import RedirectView

from . import views

urlpatterns = [
    path('curr_map', views.generate_folium_map, name='curr_map'),
    #path('signup',views.Signup,name='sign_up')
]
