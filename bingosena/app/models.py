from django.db import models
# from django.contrib.auth.models import User
# import json


# # ==============================
# # Modelo de jugadores
# # ==============================
# class Jugador(models.Model):
#     usuario = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
#     email = models.EmailField(blank=True, null=True)
#     fecha_registro = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         verbose_name_plural = "Jugadores"

# # ==============================
# # Modelo de partidas
# # ==============================
# class Partida(models.Model):    
#     codigo = models.CharField(max_length=20, unique=True)  # Código único para la partida
#     fecha_creacion = models.DateTimeField(auto_now_add=True)
#     max_tablas_por_jugador = models.PositiveIntegerField(default=3)
#     ganador = models.ForeignKey("Jugador", on_delete=models.SET_NULL, null=True, blank=True)
    
#     def __str__(self):
#         return f"({self.codigo})"

#     class Meta:
#         verbose_name_plural = "Partidas"


# # ==============================
# # Modelo de tablas de bingo
# # ==============================
# class TablaBingo(models.Model):
#     partida = models.ForeignKey(Partida, on_delete=models.CASCADE)
#     jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
#     codigo = models.CharField(max_length=20, unique=True)  # Código único para la tabla
#     fecha_creacion = models.DateTimeField(auto_now_add=True)
#     activa = models.BooleanField(default=True)
    
#     # Guardamos las columnas como JSON (listas de números)
#     b_col = models.JSONField()  
#     i_col = models.JSONField()  
#     n_col = models.JSONField()
#     g_col = models.JSONField()
#     o_col = models.JSONField()
    
#     # Para seguimiento de números marcados
#     numeros_marcados = models.JSONField(default=list)
#     class Meta:
#         verbose_name_plural = "Tablas de Bingo"


# # ==============================
# # Modelo de números sorteados
# # ==============================
# class NumeroSorteado(models.Model):
#     partida = models.ForeignKey(Partida, on_delete=models.CASCADE)
#     numero = models.PositiveIntegerField()  # Número sorteado (1-100)
#     letra = models.CharField(max_length=1)  # Letra correspondiente (B-I-N-G-O)
#     fecha_sorteo = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return f"{self.letra}-{self.numero} ({self.partida.codigo})"
    
#     class Meta:
#         verbose_name_plural = "Números Sorteados"
#         ordering = ['-fecha_sorteo']


# # ==============================
# # Modelo de victorias
# # ==============================
# class Victoria(models.Model):
#     TIPO_VICTORIA_CHOICES = (
#         ('linea', 'Línea'),
#         ('bingo', 'Bingo'),
#         ('patron', 'Patrón Especial'),
#     )
    
#     partida = models.ForeignKey(Partida, on_delete=models.CASCADE)
#     jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
#     tabla = models.ForeignKey(TablaBingo, on_delete=models.CASCADE)
#     tipo_victoria = models.CharField(max_length=20, choices=TIPO_VICTORIA_CHOICES)
#     fecha_victoria = models.DateTimeField(auto_now_add=True)
#     numeros_ganadores = models.JSONField(default=list)  # Lista de números ganadores
    
#     def __str__(self):
#         return f"Victoria {self.tipo_victoria} - {self.jugador.usuario.username if self.jugador.usuario else self.jugador.email}"

    
#     class Meta:
#         verbose_name_plural = "Victorias"
