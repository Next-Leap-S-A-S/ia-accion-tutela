/* Utilidades compartidas de las funciones de Vercel. */
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

function cors(req, res) {
  const permitidos = (process.env.ALLOWED_ORIGINS || "https://next-leap-s-a-s.github.io").split(",").map((s) => s.trim());
  const o = req.headers.origin;
  if (o && (permitidos.includes(o) || permitidos.includes("*"))) {
    res.setHeader("Access-Control-Allow-Origin", o);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type, x-clase");
  if (req.method === "OPTIONS") { res.status(204).end(); return true; }
  return false;
}

function codigosValidos() {
  return (process.env.CLASE_CODIGOS || "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
}

function autorizado(req) {
  const c = String(req.headers["x-clase"] || "").trim().toUpperCase();
  const v = codigosValidos();
  return !!c && v.includes(c);
}

/** Valida CORS, m\u00e9todo y c\u00f3digo de clase. Devuelve true si ya respondi\u00f3. */
function guardia(req, res) {
  if (cors(req, res)) return true;
  if (req.method !== "POST") { res.status(405).json({ error: "Usa POST." }); return true; }
  if (!autorizado(req)) { res.status(401).json({ error: "Ese c\u00f3digo no es el de la clase." }); return true; }
  return false;
}

function cuerpo(req) {
  const b = req.body;
  if (!b) return {};
  if (typeof b === "string") { try { return JSON.parse(b); } catch (e) { return {}; } }
  return b;
}

const recorta = (s, n) => String(s == null ? "" : s).slice(0, n);

async function claude(payload) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, thinking: { type: "between_tools" }, ...payload }),
  });
  return r;
}

module.exports = { MODEL, guardia, cors, cuerpo, recorta, claude };
