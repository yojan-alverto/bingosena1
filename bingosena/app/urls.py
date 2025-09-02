from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home, name='Home'),
    path('Ingresar_codigo/', views.Ingresar_codigo, name='Ingresar_codigo'),
    path('TablaPrincipal/', views.TablaPrincipal, name='TablaPrincipal'),
    path('selecionar_tablas/', views.selecionar_tablas, name='selecionar_tablas'),
    path('Plantilla_logueo/', views.Plantilla_logueo, name='Plantilla_logueo'),
]