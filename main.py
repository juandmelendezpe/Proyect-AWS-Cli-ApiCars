from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="API Tienda de Autos")

# Configurar CORS - permitir cualquier origen para pruebas
origins = [
    "*",
    "http://localhost:4200",
    "https://tienda-autos-frontend.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Auto(BaseModel):
    id: Optional[str] = None
    marca: str
    modelo: str
    anio: int
    precio: float
    color: str
    kilometraje: int
    disponible: bool = True

autos_db = [
    {
        "id": "1",
        "marca": "Toyota",
        "modelo": "Corolla",
        "anio": 2022,
        "precio": 25000.0,
        "color": "Blanco",
        "kilometraje": 15000,
        "disponible": True
    },
    {
        "id": "2",
        "marca": "Honda",
        "modelo": "Civic",
        "anio": 2021,
        "precio": 23000.0,
        "color": "Negro",
        "kilometraje": 25000,
        "disponible": True
    },
    {
        "id": "3",
        "marca": "Ford",
        "modelo": "Focux",
        "anio": 2020,
        "precio": 18000.0,
        "color": "Azul",
        "kilometraje": 35000,
        "disponible": False
    }
]

@app.get("/")
def root():
    return {"mensaje": "API Tienda de Autos"}

@app.post("/autos")
def crear_auto(auto: Auto):
    auto.id = str(uuid.uuid4())
    autos_db.append(auto.model_dump())
    return auto

@app.get("/autos")
def obtener_autos():
    return autos_db

@app.get("/autos/{auto_id}")
def obtener_auto(auto_id: str):
    auto = next((a for a in autos_db if a["id"] == auto_id), None)
    if not auto:
        raise HTTPException(status_code=404, detail="Auto no encontrado")
    return auto

@app.put("/autos/{auto_id}")
def actualizar_auto(auto_id: str, auto_actualizado: Auto):
    for i, auto in enumerate(autos_db):
        if auto["id"] == auto_id:
            auto_actualizado.id = auto_id
            autos_db[i] = auto_actualizado.model_dump()
            return auto_actualizado
    raise HTTPException(status_code=404, detail="Auto no encontrado")

@app.delete("/autos/{auto_id}")
def eliminar_auto(auto_id: str):
    for i, auto in enumerate(autos_db):
        if auto["id"] == auto_id:
            del autos_db[i]
            return {"mensaje": "Auto eliminado"}
    raise HTTPException(status_code=404, detail="Auto no encontrado")

# Vercel necesita acceder directamente a la instancia de la app
# El bloque if __name__ == "__main__" solo se usa para desarrollo local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)