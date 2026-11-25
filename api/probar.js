const { guardia, cuerpo, recorta, claude } = require("./_lib");

/* Ejecuta un prompt y devuelve la respuesta como texto en streaming. */
module.exports = async (req, res) => {
  if (guardia(req, res)) return;
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: "Falta configurar la clave de la IA." });
  const prompt = recorta(cuerpo(req).prompt, 20000).trim();
  if (!prompt) return res.status(400).json({ error: "El prompt est\u00e1 vac\u00edo." });
  try {
    const r = await claude({
      max_tokens: 3500,
      stream: true,
      system: "Responde en espa\u00f1ol de Colombia. Es un ejercicio de clase: trabaja solo con lo que el usuario escribi\u00f3, no inventes hechos ni jurisprudencia, y marca con [verificar] las normas que cites. Si hay campos entre corchetes sin llenar, dilo en una l\u00ednea al comienzo y avanza con supuestos expl\u00edcitos.",
      messages: [{ role: "user", content: prompt }],
    });
    if (!r.ok || !r.body) return res.status(502).json({ error: "La IA no respondi\u00f3. Intenta de nuevo." });
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    const dec = new TextDecoder();
    let buf = "";
    for await (const chunk of r.body) {
      buf += dec.decode(chunk, { stream: true });
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const linea = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!linea.startsWith("data:")) continue;
        try {
          const ev = JSON.parse(linea.slice(5));
          if (ev.type === "content_block_delta" && ev.delta && ev.delta.type === "text_delta") res.write(ev.delta.text);
        } catch (e) { /* l\u00ednea parcial */ }
      }
    }
    res.end();
  } catch (e) {
    if (!res.headersSent) res.status(502).json({ error: "No se pudo conectar con la IA. Intenta de nuevo." });
    else res.end();
  }
};
