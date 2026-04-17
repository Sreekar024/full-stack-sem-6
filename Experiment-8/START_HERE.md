# 🚀 START HERE - Experiment 8

## Welcome to JWT Authentication Frontend!

This guide will get you up and running in **3 minutes**.

---

## 📦 Step 1: Install (1 minute)

```bash
cd Experiment-8
npm install
```

Wait for dependencies to install... ⏳

---

## ▶️ Step 2: Start (30 seconds)

```bash
npm start
```

App opens automatically at `http://localhost:3000`

---

## 🧪 Step 3: Test (1.5 minutes)

### Login
1. See the login page ✅
2. Enter credentials:
   - Username: `user1`
   - Password: `password123`
3. Click "Login" ✅

### After Login
1. Should see dashboard
2. Open DevTools (F12)
3. Go to "Application" → "Session Storage"
4. See your JWT token! ✅

### Fetch Data
1. Click "Fetch Protected Data"
2. See response data displayed ✅

### Logout
1. Click "Logout"
2. Returns to login page ✅
3. SessionStorage is cleared ✅

---

## 📁 What You Have

```
Experiment-8/
├── src/
│   ├── components/
│   │   ├── Login.js ................... Login form
│   │   └── Dashboard.js .............. Protected page
│   ├── App.js ......................... Main app
│   ├── App.css ........................ All styles
│   └── index.js ....................... Entry point
├── package.json ....................... Dependencies
└── README.md .......................... Full docs
```

---

## 🎯 Key Features

✅ **Login** - User authentication  
✅ **Session Storage** - JWT stored safely  
✅ **Protected Routes** - Auto-redirect if no token  
✅ **API Integration** - Calls /login and /protected  
✅ **Beautiful UI** - Modern design with animations  
✅ **Error Handling** - User-friendly messages  

---

## 📖 Documentation

| File | Purpose | Read Time |
|------|---------|-----------|
| **QUICK_START.md** | Quick setup guide | 2 min |
| **README.md** | Full documentation | 10 min |
| **TESTING_GUIDE.md** | Testing procedures | 15 min |
| **API_INTEGRATION_GUIDE.md** | API details | 10 min |
| **DEPLOYMENT_GUIDE.md** | Deploy to production | 10 min |

---

## 🔧 Configuration

### Change Backend URL

Edit `src/components/Login.js` line 40:
```javascript
// Change from:
'http://localhost:5000/login'

// To your backend:
'https://your-backend-url.com/login'
```

Also edit `src/components/Dashboard.js` line 50 for `/protected` endpoint.

---

## 🐛 Troubleshooting

### "Port 3000 already in use"
```bash
# Kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### "Cannot connect to backend"
- Ensure backend is running on `http://localhost:5000`
- Check backend CORS is enabled
- Verify backend URLs in Login.js and Dashboard.js

### "Token not in sessionStorage"
- Login again
- Check DevTools for errors (F12 → Console)
- Ensure backend returns a token

---

## ✨ Next Steps

1. **Test locally** - Use provided credentials
2. **Connect to backend** - Update API URLs
3. **Test all features** - Follow TESTING_GUIDE.md
4. **Deploy** - Follow DEPLOYMENT_GUIDE.md

---

## 📞 Need Help?

1. **Setup issues?** → Read QUICK_START.md
2. **API questions?** → Read API_INTEGRATION_GUIDE.md
3. **Testing?** → Read TESTING_GUIDE.md
4. **Deployment?** → Read DEPLOYMENT_GUIDE.md
5. **General?** → Read README.md

---

## 🎉 You're Ready!

Run `npm start` and see it work! 

Questions? Check the documentation files or review the code comments.

**Happy coding! 🚀**

---

### Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Quick Links

- 📖 [Full README](README.md)
- ⚡ [Quick Start Guide](QUICK_START.md)
- 🧪 [Testing Guide](TESTING_GUIDE.md)
- 🔌 [API Integration](API_INTEGRATION_GUIDE.md)
- 🚀 [Deployment Guide](DEPLOYMENT_GUIDE.md)
- ✅ [Submission Checklist](SUBMISSION_CHECKLIST.md)
- 📋 [Implementation Summary](IMPLEMENTATION_SUMMARY.md)

---

**Experiment 8 - JWT Authentication Frontend**  
**Status: Ready to Use ✅**
