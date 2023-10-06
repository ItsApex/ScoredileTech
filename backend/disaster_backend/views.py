from django.shortcuts import render
from django.http import JsonResponse
import folium
# Create your views here.
latitude = 19.107460
longitude = 72.837500

def generate_folium_map(request):
    # Create a Folium map
    m = folium.Map(location=[latitude, longitude], zoom_start=12)
    
    # Add markers, circles, or other elements to the map as needed

    # Convert the map to HTML
    map_html = m.get_root().render()

    return JsonResponse({'map_html': map_html})


#def Signup(request):
    #return JsonResponse({'temp': "meow"})