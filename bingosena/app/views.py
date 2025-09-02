from django.shortcuts import render

# Create your views here.
def Home(request):
    contexto= {}
    return render(request, 'Home.html', contexto)

#region panel logueo
def Plantilla_logueo(request):
    contexto= {}
    return render(request, 'Logueo/plantilla_logueo.html', contexto)

#endregion

#region Panel Usuario
def Ingresar_codigo(request):
    contexto= {}
    return render(request, 'panel_usuario/Ingresar_codigo.html', contexto)

def selecionar_tablas(request):
    contexto= {}
    return render(request, 'panel_usuario/selecionar_tablas.html', contexto)

#endregion
#region Panel Admin
def TablaPrincipal(request):
    contexto= {}
    return render(request, 'panel_admin/TablaPrincipal.html', contexto)
#endregion