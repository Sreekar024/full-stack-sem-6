# PROJECT SETUP & DEPLOYMENT GUIDE

## 🎯 Complete Setup Instructions

### System Requirements
- Node.js v14 or higher
- npm or yarn
- Modern web browser
- Backend API running on port 5000

---

## 📦 Step 1: Install Dependencies

### Navigate to project
```bash
cd Experiment-8
```

### Install all packages
```bash
npm install
```

### Verify installation
```bash
npm list
```

**Expected output:**
```
Experiment-8@0.1.0
├── react@18.2.0
├── react-dom@18.2.0
├── axios@1.6.0
├── react-router-dom@6.20.0
├── bootstrap@5.3.0
├── @mui/material@5.14.0
├── @emotion/react@11.11.0
├── @emotion/styled@11.11.0
└── react-scripts@5.0.1
```

---

## 🚀 Step 2: Start Development Server

### Start the app
```bash
npm start
```

### Expected console output
```
Compiled successfully!

You can now view jwt-frontend in the browser.

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Browser auto-opens
- If not, manually navigate to `http://localhost:3000`

---

## 🧪 Step 3: Initial Test

### Test Login
1. Username: `user1`
2. Password: `password123`
3. Click "Login"

### Expected Behavior
✅ Redirects to dashboard
✅ Shows logged-in username
✅ Token visible in sessionStorage

---

## 🔧 Step 4: Configuration

### Backend URL Configuration

**File:** `src/components/Login.js` (Line ~40)
```javascript
// Current (localhost)
const response = await axios.post(
  'http://localhost:5000/login',
  ...
);

// For production, change to:
const response = await axios.post(
  'https://your-backend-url.com/login',
  ...
);
```

**File:** `src/components/Dashboard.js` (Line ~50)
```javascript
// Current (localhost)
const response = await axios.get(
  'http://localhost:5000/protected',
  ...
);

// For production, change to:
const response = await axios.get(
  'https://your-backend-url.com/protected',
  ...
);
```

### Using Environment Variables (Recommended)

1. Create `.env` file in project root:
```bash
touch .env
```

2. Add to `.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

3. Update components to use:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// In Login.js
const response = await axios.post(`${API_URL}/login`, ...);

// In Dashboard.js
const response = await axios.get(`${API_URL}/protected`, ...);
```

4. For production `.env`:
```
REACT_APP_API_URL=https://your-backend-url.com
```

---

## 📁 Project Structure After Setup

```
Experiment-8/
├── node_modules/                    (All dependencies)
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   └── Dashboard.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env                             (Create if needed)
├── package.json
├── package-lock.json
├── README.md
├── QUICK_START.md
├── TESTING_GUIDE.md
└── IMPLEMENTATION_SUMMARY.md
```

---

## 🏗️ Build for Production

### Create optimized build
```bash
npm run build
```

### Expected output
```
The build folder is ready to be deployed.
Find out more information at:
  https://cra.link/deployment
```

### Build folder contents
```
build/
├── index.html
├── static/
│   ├── css/
│   │   └── main.*.css
│   ├── js/
│   │   ├── main.*.js
│   │   └── *.chunk.js
│   └── media/
└── favicon.ico
```

### Deploy build folder
- Upload `build/` folder to your hosting service
- Configure web server to serve `index.html` for all routes

---

## 🐛 Common Issues & Fixes

### Issue: "npm: command not found"
**Solution:**
1. Install Node.js from https://nodejs.org
2. Verify installation: `node --version`
3. Restart terminal

### Issue: "Port 3000 already in use"
**Solution (macOS/Linux):**
```bash
# Find process on port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Start app again
npm start
```

**Solution (Windows):**
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F

# Start app again
npm start
```

### Issue: "Cannot connect to backend"
**Solution:**
1. Verify backend is running: `http://localhost:5000`
2. Check backend CORS is enabled
3. Verify backend URLs in Login.js and Dashboard.js
4. Check firewall settings

### Issue: "Token not visible in sessionStorage"
**Solution:**
1. Open DevTools (F12)
2. Go to Application tab
3. Look for Session Storage (not Local Storage)
4. If empty, try logging in again
5. Check browser console for errors

### Issue: "401 Unauthorized error"
**Solution:**
1. Verify token is stored in sessionStorage
2. Check token format is correct
3. Verify backend token validation
4. Check token hasn't expired
5. Try logging in again

### Issue: "CORS error when calling API"
**Solution (Backend config needed):**

The backend should include CORS headers:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## 🧪 Running Tests

### Test login functionality
```bash
npm test
```

### Run specific test
```bash
npm test -- Login.js
```

### Exit test mode
```
Press 'q' to quit
```

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] No console errors in DevTools
- [ ] No console warnings
- [ ] All features tested
- [ ] Responsive design verified
- [ ] Error handling works

### Configuration
- [ ] Backend URL configured correctly
- [ ] Environment variables set
- [ ] CORS enabled on backend
- [ ] SSL/TLS configured (for HTTPS)

### Testing
- [ ] Login works
- [ ] Protected route works
- [ ] Logout works
- [ ] Token stored in sessionStorage
- [ ] Token cleared on logout
- [ ] Auto-redirect on no token

### Performance
- [ ] Build completes without errors
- [ ] No 404 errors for assets
- [ ] Load time acceptable
- [ ] No memory leaks

### Security
- [ ] No sensitive data in console logs
- [ ] Token not in URL parameters
- [ ] HTTPS enabled (production)
- [ ] CORS properly configured
- [ ] No hardcoded credentials

---

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify:**
```bash
netlify login
```

3. **Deploy:**
```bash
npm run build
netlify deploy --prod --dir=build
```

4. **Configure environment:**
- Set `REACT_APP_API_URL` in Netlify dashboard
- Build & Deploy settings

### Option 2: Vercel

1. **Push code to GitHub**

2. **Connect to Vercel:**
- Go to https://vercel.com
- Import project from GitHub

3. **Configure environment:**
- Add `REACT_APP_API_URL` environment variable
- Deploy

### Option 3: Docker

1. **Create Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

2. **Build image:**
```bash
docker build -t jwt-frontend .
```

3. **Run container:**
```bash
docker run -p 80:80 jwt-frontend
```

### Option 4: Traditional Hosting

1. **Build project:**
```bash
npm run build
```

2. **Upload build folder:**
- FTP/SFTP `build/` folder to server
- Or use hosting control panel file manager

3. **Configure web server:**
- Ensure all routes serve `index.html`
- Configure DNS for domain

---

## 📊 Performance Optimization

### Bundle Analysis
```bash
npm install --save-dev source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### Code Splitting
Already implemented via React.lazy (if added in future)

### Caching
Configure in web server (nginx/Apache)

---

## 📞 Support & Troubleshooting

### Check Logs
1. **Browser Console** (F12)
2. **Network Tab** (API calls)
3. **Application Tab** (sessionStorage)
4. **Terminal** (npm start output)

### Debug API Calls
1. Open DevTools → Network tab
2. Perform login
3. Find `login` request
4. Check Request/Response headers and body

### Enable Debugging
```javascript
// Add to components
console.log('Debug info:', value);
console.error('Error:', error);
console.warn('Warning:', warning);
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Axios Guide](https://axios-http.com)
- [React Router Docs](https://reactrouter.com)
- [JWT.io Information](https://jwt.io)
- [Bootstrap Docs](https://getbootstrap.com)

---

## ✅ Deployment Verification

After deploying, verify:

1. **Frontend loads** - No 404 errors
2. **API calls work** - Network requests successful
3. **Login works** - Can authenticate
4. **Protected route works** - Can access dashboard
5. **Token stored** - sessionStorage has token
6. **Logout works** - Session cleared
7. **Mobile responsive** - Works on mobile

---

## 🎉 You're Ready!

Your JWT authentication frontend is ready for deployment. Follow the deployment option that best suits your infrastructure.

**Happy deploying! 🚀**
