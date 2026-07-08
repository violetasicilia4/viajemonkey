module.exports = (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  res.status(200).json({ status: "ok", mode: process.env.NODE_ENV, hasGeminiKey: !!apiKey });
};
