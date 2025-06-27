from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import sys
import os

# Agregar el directorio raíz al path para poder importar el módulo principal
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Importar la aplicación principal
from main import app as main_app

# Crear una nueva aplicación para la API
app = FastAPI()

# Redirigir todas las solicitudes a la aplicación principal
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    response = await call_next(request)
    return response

# Incluir todas las rutas de la aplicación principal
app.routes.extend(main_app.routes)
app.middleware_stack = main_app.middleware_stack