## 🌐 Setting Up Environment Variables in Vercel

1. Go to your Vercel Dashboard → Project → Settings → Environment Variables
2. Add the following:
   - `POLYGON_API_KEY = <your-api-key-here>`
POLYGON_API_KEY_1 = Y7LYhphs7mpi6BLN8mNrPhG5IeWpy3uk
POLYGON_API_KEY_2 = 4pUw6iX2Ph7cswPbnyNqz89nQvhnbZ1Q
3. To use in your code, access with: `process.env.POLYGON_API_KEY`
4. Environment variables are safely stored and not exposed to frontend code
