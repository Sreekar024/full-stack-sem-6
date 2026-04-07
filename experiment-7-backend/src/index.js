import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Allow requests from Vite dev server (5173 or 5174)
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }));
app.use(express.json());

// ── Request logger — prints every request to the terminal ──────────────────
app.use((req, _res, next) => {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`[${now}]  ${req.method.padEnd(7)} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Experiment 7 backend is running' });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n  Backend running → http://localhost:${PORT}`);
  console.log(`  Health check  → http://localhost:${PORT}/api/health`);
  console.log(`  Login         → POST http://localhost:${PORT}/api/auth/login`);
  console.log(`  Posts         → http://localhost:${PORT}/api/posts\n`);
  console.log(`  Demo credentials:`);
  console.log(`    email: admin@test.com`);
  console.log(`    password: password123\n`);
});
