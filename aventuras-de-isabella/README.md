# Aventuras de Isabella

Una colección de historias educativas en español latinoamericano para niños de cuatro y cinco años. Un toque en un episodio activa el audio en iPad; después, la historia narrada avanza automáticamente.

Incluye tres episodios:

- **El ciclo del agua**, con lenguaje sencillo y científicamente correcto.
- **El abecedario**, con las 27 letras del español, incluida la Ñ. Cada escena muestra la letra en mayúscula y minúscula junto con una ilustración clara de una palabra que comienza con ella.
- **Las estaciones**, con una explicación sencilla de por qué cambian y consejos para cuidarse del polen, el Sol, el calor, las hojas mojadas y el frío.

La aplicación funciona sin conexión después de la primera visita y no recopila ni envía datos infantiles.

## Run locally

Serve the folder with any static web server. For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/aventuras-de-isabella/`.

## Ilustraciones y narración

Las escenas y los modelos oficiales de Isabella, Juno, Pamela y Federico se generaron a partir de las imágenes familiares de referencia proporcionadas. Isabella y Juno son los protagonistas constantes; Pamela y Federico aparecen como apoyo cuando una lección necesita la guía de un adulto. Cada escena ilustra directamente el concepto narrado. Isabella conserva su cabello lacio, oscuro y hasta los hombros; Juno conserva el diseño establecido de perro salchicha café.

Los archivos MP3 incluidos usan una voz femenina nativa de español latinoamericano y funcionan sin conexión. La pronunciación se ajustó y verificó con las grabaciones familiares: Isabella se dice `ee-sah-BEH-lah` y Juno se dice `JOO-noh`, con el sonido inicial de la palabra inglesa `June`. El episodio del abecedario evita repetir los nombres para conservar esa pronunciación familiar aprobada. También se verificaron la Eñe y palabras como ñandú, mayúscula y minúscula. Si falta una grabación, la aplicación selecciona la mejor voz latinoamericana instalada en el dispositivo y aplica ayudas fonéticas. El guion, los subtítulos y las rutas de audio están definidos en `app.js`.

Before publishing photos, video, or recordings of a child, obtain the appropriate family consent and decide whether the site should remain private.

## Deploy

The project has no build step. GitHub Pages publishes this app from the `aventuras-de-isabella` directory. The service worker caches both complete episodes for offline playback.
