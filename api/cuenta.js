const { cors } = require("./_lib");
/* Las cuentas no se usan en esta versi\u00f3n: los prompts se guardan en el navegador. */
module.exports = async (req, res) => {
  if (cors(req, res)) return;
  res.status(501).json({ error: "El guardado con cuenta no est\u00e1 disponible. Tus prompts se guardan en este navegador." });
};
