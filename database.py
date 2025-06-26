from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./autos.db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class AutoDB(Base):
    __tablename__ = "autos"
    
    id = Column(String, primary_key=True, index=True)
    marca = Column(String, index=True)
    modelo = Column(String)
    anio = Column(Integer)
    precio = Column(Float)
    color = Column(String)
    kilometraje = Column(Integer)
    disponible = Column(Boolean, default=True)

# Crear tablas
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()