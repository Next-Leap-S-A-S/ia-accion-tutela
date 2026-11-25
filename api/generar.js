const { guardia, cuerpo, recorta, claude } = require("./_lib");
const { METODO, TAREAS, perfilTexto } = require("./_tutela");

const HERRAMIENTA = {
  name: "entregar_prompts",
  description: "Entrega los prompts RCI generados.",
  input_schema: {
    type: "object",
    properties: {
      prompts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            titulo: { type: "string", description: "T\u00edtulo de la tarea, empieza con un verbo en infinitivo, m\u00e1ximo 14 palabras." },
            rol: { type: "string" },
            contexto: { type: "string" },
            instruccion: { type: "string" },
            uso: { type: "string", description: "Para qu\u00e9 sirve, 1 o 2 frases." },
            error_comun: { type: "string", description: "Error t\u00edpico al usarlo y c\u00f3mo evitarlo, 1 o 2 frases." },
            verificar: { type: "string", description: "Qu\u00e9 debe verificar el usuario en fuente oficial antes de usar la respuesta, 1 o 2 frases." },
          },
          required: ["titulo", "rol", "contexto", "instruccion", "uso", "error_comun", "verificar"],
        },
      },
    },
    required: ["prompts"],
  },
};

module.exports = async (req, res) => {
  if (guardia(req, res)) return;
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: "Falta configurar la clave de la IA." });
  const b = cuerpo(req);
  const tarea = TAREAS[b.tarea] ? b.tarea : "libre";
  const cantidad = Math.min(Math.max(parseInt(b.cantidad, 10) || 2, 1), 3);
  const parte = Math.max(parseInt(b.parte, 10) || 1, 1);
  const pedido = recorta(b.pedido, 1200);
  const usuario = `PERFIL DEL USUARIO\n${perfilTexto(b.perfil)}\n\nTAREA\nGenera ${cantidad} prompts distintos para: ${TAREAS[tarea]}.\n${pedido ? `Pedido libre del usuario: ${pedido}\n` : ""}\nVARIEDAD\nEste es el lote n\u00famero ${parte}. Cubre situaciones distintas a las m\u00e1s obvias y evita repetir escenarios entre los ${cantidad} prompts. Ad\u00e1ptalos al perfil: rol, sub\u00e1reas, tono y nivel de experiencia con IA.\n\nEntrega el resultado llamando a la herramienta entregar_prompts. Cada prompt debe cumplir la extensi\u00f3n y las reglas del m\u00e9todo.`;
  try {
    const r = await claude({
      max_tokens: 9000,
      system: METODO,
      tools: [HERRAMIENTA],
      tool_choice: { type: "tool", name: "entregar_prompts" },
      messages: [{ role: "user", content: usuario }],
    });
    const j = await r.json();
    if (!r.ok) return res.status(502).json({ error: "La IA no respondi\u00f3. Intenta de nuevo." });
    const uso = (j.content || []).find((c) => c.type === "tool_use");
    const prompts = uso && uso.input && Array.isArray(uso.input.prompts) ? uso.input.prompts : [];
    if (!prompts.length) return res.status(502).json({ error: "La IA devolvi\u00f3 una respuesta vac\u00eda. Intenta de nuevo." });
    res.status(200).json({ prompts });
  } catch (e) {
    res.status(502).json({ error: "No se pudo conectar con la IA. Intenta de nuevo." });
  }
};
