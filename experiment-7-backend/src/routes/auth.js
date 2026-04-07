import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'experiment7_super_secret_key';

// Demo user (in a real app use a database + bcrypt hashed passwords)
const USERS = [
  { id: 1, email: 'admin@test.com', password: 'password123', name: 'Admin' },
];

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// POST /api/auth/logout (stateless — client discards token)
router.post('/logout', (_req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
