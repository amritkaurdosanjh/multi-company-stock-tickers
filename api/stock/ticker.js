// /api/stock/[ticker].js
export default async function handler(req, res) {
  const { ticker } = req.query;

  // ⚠️ Replace this with live API logic if needed
  const mockData = {
    results: [
      { t: Date.now(), v: 12345, vw: 149.87, o: 148.3, c: 150.4, h: 151.2, l: 147.8, n: 72 },
      { t: Date.now() - 86400000, v: 11432, vw: 148.91, o: 147.9, c: 149.5, h: 150.8, l: 147.1, n: 68 }
    ]
  };

  res.status(200).json(mockData);
}
