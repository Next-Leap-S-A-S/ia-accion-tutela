const { guardia } = require("./_lib");
module.exports = async (req, res) => {
  if (guardia(req, res)) return;
  res.status(200).json({ ok: true });
};
