# Inteligencia artificial en la acción de tutela

Material de Next Leap para el Diplomado Intensivo en Acción de Tutela (Departamento de Derecho Constitucional, Universidad Externado de Colombia).

## Qué hay

- `index.html` y `taller-prompts.html`: taller de prompts RCI con 31 ejemplos, laboratorio y ejercicio. Se generan con `python3 src/build.py`. Es estático y funciona sin conexión.
- `generador/`: generador de prompts extensos con IA (front estático). Pide un código de clase, el usuario arma su perfil y la IA produce prompts de tutela a su medida.
- `api/`: funciones de Vercel que usa el generador: `acceso`, `generar`, `expandir`, `probar`. `cuenta` responde 501 a propósito: los prompts se guardan en el navegador.

## Desplegar el generador

El front puede vivir en GitHub Pages, pero la clave de la IA no puede estar en una página estática. Por eso las funciones de `api/` van en Vercel.

1. Importar este repo en Vercel. Variables de entorno:
   - `ANTHROPIC_API_KEY`: clave de la API de Anthropic.
   - `CLASE_CODIGOS`: códigos de clase válidos separados por coma, por ejemplo `TUTELA2026`.
   - `ALLOWED_ORIGINS`: orígenes permitidos separados por coma. Por defecto `https://next-leap-s-a-s.github.io`.
   - `ANTHROPIC_MODEL` (opcional): por defecto `claude-sonnet-5-5`.
2. En `generador/config.js` poner `window.API_BASE = "https://<proyecto>.vercel.app";` si el front se sirve desde GitHub Pages. Si todo se sirve desde Vercel se deja vacío.

## Contrato de la API

Todas reciben `POST` con el encabezado `x-clase` (código de clase).

| Ruta | Cuerpo | Respuesta |
|------|--------|-----------|
| `/api/acceso` | vacío | `{ok:true}` o 401 |
| `/api/generar` | `{perfil, tarea, cantidad, parte, pedido}` | `{prompts:[{titulo, rol, contexto, instruccion, uso, error_comun, verificar}]}` |
| `/api/expandir` | `{rol, contexto, instruccion, perfil}` | `{rol, contexto, instruccion}` |
| `/api/probar` | `{prompt}` | texto en streaming |

## Rigor jurídico

Los prompts no citan números de sentencia. Las normas se marcan con `[verificar]`. En los de decisión judicial el sentido del fallo se deja como `[DECISIÓN DEL JUEZ]`. Trabajan con información anonimizada.
