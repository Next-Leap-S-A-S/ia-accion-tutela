const { guardia, cuerpo, recorta, claude } = require("./_lib");
const { METODO, perfilTexto } = require("./_tutela");

const HERRAMIENTA = {
  name: "entregar_prompt",
  description: "Entrega el prompt extendido.",
  input_schema: {
    type: "object",
    properties: { rol: { type: "string" }, contexto: { type: "string" }, instruccion: { type: "string" } },
    required: ["rol", "contexto", "instruccion"],
  },
};

module.exports = async (req, res) => {
  if (guardia(req, res)) return;
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: "Falta configurar la clave de la IA." });
  const b = cuerpo(req);
  const rol = recorta(b.rol, 4000), ctx = recorta(b.contexto, 6000), ins = recorta(b.instruccion, 6000);
  if (!rol && !ctx && !ins) return res.status(400).json({ error: "Escribe una idea en alguna de las tres partes." });
  const usuario = `El usuario escribi\u00f3 un borrador de prompt para una tarea de acci\u00f3n de tutela. Extiende y mejora el borrador conservando su intenci\u00f3n.\n\nPERFIL\n${perfilTexto(b.perfil)}\n\nBORRADOR\nROL: ${rol || "(vac\u00edo)"}\n\nCONTEXTO: ${ctx || "(vac\u00edo)"}\n\nINSTRUCCI\u00d3N: ${ins || "(vac\u00edo)"}\n\nReglas de la extensi\u00f3n:\n- Respeta lo que el usuario ya dijo. No cambies la tarea.\n- Completa lo que falta en cada parte hasta la extensi\u00f3n del m\u00e9todo. Si una parte est\u00e1 vac\u00eda, red\u00e1ctala.\n- Convierte los datos que el usuario debe aportar en campos [entre corchetes].\n- No inventes hechos del caso. No cites sentencias.\nEntrega el resultado llamando a la herramienta entregar_prompt.`;
  try {
    const r = await claude({
      max_tokens: 5000,
      system: METODO,
      tools: [HERRAMIENTA],
      messages: [{ role: "user", content: usuario }],
    });
    const j = await r.json();
    if (!r.ok) return res.status(502).json({ error: "La IA no respondi\u00f3. Intenta de nuevo." });
    const uso = (j.content || []).find((c) => c.type === "tool_use");
    const o = uso && uso.input;
    if (!o || !o.rol || !o.contexto || !o.instruccion) return res.status(502).json({ error: "La IA devolvi\u00f3 una respuesta incompleta. Intenta de nuevo." });
    res.status(200).json({ rol: o.rol, contexto: o.contexto, instruccion: o.instruccion });
  } catch (e) {
    res.status(502).json({ error: "No se pudo conectar con la IA. Intenta de nuevo." });
  }
};
