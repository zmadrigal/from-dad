# Aventuras de Isabella

Una historia de ciencia en español latinoamericano para una niña de cuatro años. Un toque inicial activa el audio en iPad; después, la historia narrada avanza automáticamente.

El episodio incluido explica el ciclo del agua con lenguaje sencillo y científicamente correcto. Funciona sin conexión después de la primera visita y no recopila ni envía datos infantiles.

## Run locally

Serve the folder with any static web server. For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/aventuras-de-isabella/`.

## Ilustraciones y narración

Las cinco escenas y el modelo principal de Isabella y Juno se generaron a partir de las imágenes de referencia proporcionadas. Cada escena ilustra directamente el momento científico narrado.

Los siete archivos MP3 incluidos usan una voz femenina nativa de español latinoamericano y funcionan sin conexión. La pronunciación se ajustó y verificó con las grabaciones familiares: Isabella se dice `ee-sah-BEH-lah` y Juno se dice `JOO-noh`, con el sonido inicial de la palabra inglesa `June`. Los archivos pueden reemplazarse por grabaciones familiares aprobadas usando los mismos nombres. Si falta una grabación, la aplicación selecciona la mejor voz latinoamericana instalada en el dispositivo y aplica ayudas fonéticas. El guion, los subtítulos y las rutas de audio están definidos en `app.js`.

Before publishing photos, video, or recordings of a child, obtain the appropriate family consent and decide whether the site should remain private.

## Deploy

The project has no build step. GitHub Pages publishes this app from the `aventuras-de-isabella` directory. The service worker caches the complete first lesson for offline playback.
