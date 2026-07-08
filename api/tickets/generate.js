const { GoogleGenAI, Type } = require("@google/genai");
const { getCuratedFallback } = require("../_lib/curatedFallback");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { destination, mood, customRequest } = req.body || {};
  if (!destination) {
    return res.status(400).json({ error: "Destination is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined, returning high-quality static curated tickets.");
    const curatedFallback = getCuratedFallback(destination, mood || "Adventures");
    return res.json({ tickets: curatedFallback, aiGenerated: false });
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });

  try {
    const prompt = `Generate 3 completely unique, creative local attraction or event entry tickets for a traveler visiting ${destination}.
      The traveler is looking for something matching this vibe/mood: "${mood || "Adventurous and local culture"}".
      Custom traveler requests/interests: "${customRequest || "None specfied"}".

      Create authentic local experiences with detailed ticketing details. Highlight specific landmark features or hidden gems in ${destination} (Madrid, Copenhagen, or Sicily).
      Provide tickets with specific custom booking codes, dates/times, pricing in Euros, gate/terminal entrances, fast track categories, and distinct color codes (choose between 'yellow', 'cyan', 'pink', or 'green').`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite, highly creative concierge travel assistant. Recommend exclusive local experiences, museum skip-the-line entrances, concerts, cruises, or hidden culinary sessions in the selected location. Provide all fields in Spanish since the app language is Spanish.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "Array of generated tickets",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Unique string id (e.g. t1, t2)" },
              title: { type: Type.STRING, description: "Name of the local attraction/entry (e.g. Acceso Prioritario Museos Vaticanos, Atardecer en Catamarán Taormina)" },
              category: { type: Type.STRING, description: "Pass type (e.g. Fast Track, Acceso VIP, Entrada General, Pase Privado)" },
              bookingCode: { type: Type.STRING, description: "Random looking code (e.g. MD-9281-VIP)" },
              venue: { type: Type.STRING, description: "Specific historic spot or address in the destination (e.g. Teatro Antico di Taormina, Palacio Real de Madrid)" },
              date: { type: Type.STRING, description: "Date (e.g. 18 de Junio, 2026)" },
              time: { type: Type.STRING, description: "Time window (e.g. 17:30 - 20:00)" },
              gate: { type: Type.STRING, description: "Specific gate or access point (e.g. Puerta Real, Muelle A, Entrada Norte)" },
              price: { type: Type.STRING, description: "Ticket price in EUR (e.g. 35.00)" },
              description: { type: Type.STRING, description: "Fascinating, brief single-sentence teaser of what makes this experience magical." },
              color: { type: Type.STRING, description: "Must be one of: 'yellow', 'cyan', 'pink', 'green'" }
            },
            required: ["id", "title", "category", "bookingCode", "venue", "date", "time", "gate", "price", "description", "color"]
          }
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI model.");
    }
    const generatedTickets = JSON.parse(responseText.trim());
    return res.json({ tickets: generatedTickets, aiGenerated: true });
  } catch (error) {
    console.error("Gemini ticket generation failed:", error);
    const fallback = getCuratedFallback(destination, mood || "Adventures");
    return res.json({ tickets: fallback, aiGenerated: false, error: error.message });
  }
};
