// /api/stock/[ticker].js
export default async function handler(req, res) {
  const { ticker } = req.query;
  const apiKey = process.env.POLYGON_API_KEY_1;

  try {
    const liveResponse = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${apiKey}`
    );

    if (!liveResponse.ok) throw new Error("Live API failed");

    const liveData = await liveResponse.json();
    const result = liveData.results?.[0];

    if (!result) throw new Error("No live results");

    const formatted = [{
      t: result.t,
      v: result.v,
      vw: result.vw,
      o: result.o,
      c: result.c,
      h: result.h,
      l: result.l,
      n: result.n || 1
    }];

    res.status(200).json({ results: formatted });
  } catch (error) {
    console.warn("⚠️ Live data unavailable, falling back to mock data:", error.message);

    const mockData = {
      results: [
        { t: Date.now(), v: 12345, vw: 149.87, o: 148.3, c: 150.4, h: 151.2, l: 147.8, n: 72 },
        { t: Date.now() - 86400000, v: 11432, vw: 148.91, o: 147.9, c: 149.5, h: 150.8, l: 147.1, n: 68 }
      ]
    };

    res.status(200).json(mockData);
  }
}
