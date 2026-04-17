const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5001;
const SECRET_KEY = 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());

// Sample users (in production, use a database)
const users = [
  { id: 1, username: 'user1', password: 'password123' },
  { id: 2, username: 'user2', password: 'password456' }
];

// ============================================
// LOGIN ENDPOINT
// ============================================
app.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Find user
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Log for debugging
    console.log(`✅ Login successful for user: ${username}`);
    console.log(`   Token: ${token}`);

    res.json({
      token,
      message: 'Login successful',
      user: { id: user.id, username: user.username }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ============================================
// PROTECTED ENDPOINT
// ============================================
app.get('/protected', (req, res) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    console.log(`✅ Protected route accessed by: ${decoded.username}`);

    res.json({
      message: 'This is protected data',
      user: decoded.username,
      userId: decoded.id,
      timestamp: new Date().toISOString(),
      data: {
        role: 'user',
        permissions: ['read', 'write'],
        access_level: 'standard'
      }
    });

  } catch (error) {
    console.error('❌ Protected route error:', error.message);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    res.status(401).json({ message: 'Unauthorized' });
  }
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// ============================================
// ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   JWT Backend Server Running ✅        ║
╚════════════════════════════════════════╝

📍 Server URL: http://localhost:${PORT}
🔗 Frontend URL: http://localhost:3000

📚 Available Endpoints:
  ✓ POST   /login       - Get JWT token
  ✓ GET    /protected   - Access protected data
  ✓ GET    /health      - Health check

🧪 Test Credentials:
  Username: user1
  Password: password123

  Username: user2
  Password: password456

💡 Example cURL Commands:

1. Login:
   curl -X POST http://localhost:${PORT}/login \\
     -H "Content-Type: application/json" \\
     -d '{"username":"user1","password":"password123"}'

2. Protected (replace TOKEN with actual token):
   curl -X GET http://localhost:${PORT}/protected \\
     -H "Authorization: Bearer TOKEN"

3. Health Check:
   curl http://localhost:${PORT}/health

════════════════════════════════════════
`);
});
