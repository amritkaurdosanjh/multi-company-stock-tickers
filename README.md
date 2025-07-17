# 📈 Multi-Company Stock Tickers

A simple stock dashboard to view mock or live data across multiple public companies. Built with HTML, JavaScript, and Vercel serverless functions.

## Features
- Dropdown to select company tickers
- API endpoint to fetch mock data (or integrate live API)
- Styled dashboard with tabular view

## Setup
1. Clone repo
2. Run `vercel dev`
3. View dashboard at `http://localhost:3000`

## Switch to live data?
Edit `api/stock/ticker.js` to query Polygon or Yahoo API securely using environment variables.
