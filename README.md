# API Tienda de Autos

API REST para gestionar una tienda de autos, desarrollada con FastAPI y desplegada en Vercel.

## Estructura del Proyecto

- `main.py`: Aplicación principal de FastAPI
- `api/index.py`: Punto de entrada para Vercel
- `requirements.txt`: Dependencias del proyecto
- `vercel.json`: Configuración para el despliegue en Vercel

## Despliegue en Vercel

Para desplegar esta API en Vercel, sigue estos pasos:

1. Asegúrate de tener instalado Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Inicia sesión en Vercel:
   ```
   vercel login
   ```

3. Despliega el proyecto:
   ```
   vercel
   ```

4. Para producción:
   ```
   vercel --prod
   ```

## Solución de problemas

Si encuentras el error "A Serverless Function has exceeded the unzipped maximum size of 250 MB", asegúrate de que:

1. El archivo `.vercelignore` esté correctamente configurado para excluir directorios grandes
2. Las dependencias en `requirements.txt` estén optimizadas
3. No estés incluyendo archivos binarios o grandes innecesarios

## Endpoints

- `GET /`: Mensaje de bienvenida
- `GET /autos`: Obtener todos los autos
- `GET /autos/{auto_id}`: Obtener un auto por ID
- `POST /autos`: Crear un nuevo auto
- `PUT /autos/{auto_id}`: Actualizar un auto
- `DELETE /autos/{auto_id}`: Eliminar un auto