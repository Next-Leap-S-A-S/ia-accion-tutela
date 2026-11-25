# Inteligencia artificial en la acción de tutela

Material de Next Leap para el Diplomado Intensivo en Acción de Tutela (Departamento de Derecho Constitucional, Universidad Externado de Colombia).

## Qué hay

- `index.html` y `taller-prompts.html`: taller de prompts RCI con 31 ejemplos, laboratorio y ejercicio. Se generan con `python3 src/build.py`. Es estático y funciona sin conexión.
- `generador/`: generador de prompts extensos de tutela (front estático). El usuario arma su perfil, elige tareas y recibe prompts a su medida.
- `tools/pregenerar.py`: genera con IA la biblioteca que usa el generador estático.
- `api/`: funciones de Vercel que usa el generador: `acceso`, `generar`, `expandir`, `probar`. `cuenta` responde 501 a propósito: los prompts se guardan en el navegador.

## Publicación en GitHub Pages (modo estático)

El generador publicado en GitHub Pages **no usa servidor ni clave**. `generador/js/generados.js` trae 70 prompts extensos pregenerados con IA por área, subárea, rol y tarea, y `generador/js/estatico.js` los entrega con la misma interfaz de la API. El código de clase (`TUTELA2026`, en `generador/config.js`) se comprueba en el navegador: es una barrera de cortesía, no de seguridad.

Qué hace y qué no hace en este modo:
- Sí: perfil, selección de tareas, lotes de prompts, edición, copiar, guardar en el navegador y laboratorio con medidor.
- No: «Extender con IA», «Mejorar con IA», «Probar con IA» y el pedido libre con IA real. El pedido libre elige los prompts más cercanos por palabras clave.

Para regenerar o ampliar la biblioteca:

```
ANTHROPIC_API_KEY=... python3 tools/pregenerar.py
```

La clave solo se lee del entorno y no se guarda.

## Modo con servidor (opcional)

Las funciones de `api/` hacen lo mismo con IA en vivo y se despliegan en Vercel. Variables de entorno: `ANTHROPIC_API_KEY`, `CLASE_CODIGOS` (por ejemplo `TUTELA2026`), `ALLOWED_ORIGINS` y, opcionalmente, `ANTHROPIC_MODEL`. Cada llamada a `/api/generar` tarda cerca de 40 segundos; `vercel.json` pide hasta 120 s por función. Para usarlo, en `generador/config.js` se pone `MODO_ESTATICO = false` y `API_BASE = "https://<proyecto>.vercel.app"`.

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
