# Bootstrap React Router Project

A modern web application built with React, Bootstrap, and React Router demonstrating responsive design and client-side routing.

## 🚀 Project Overview

This project showcases a Full Stack Development portfolio website with multiple pages covering different technology domains including Web Development, Full Stack, UI/UX Design, Frontend, Backend, and Data Science.

## ✨ Features

- **React Router Navigation** - Seamless client-side routing between pages
- **Bootstrap Components** - Responsive UI with Cards, Navbar, Buttons, and Dropdowns
- **Multiple Pages** - 8 different pages with consistent design
- **Interactive Elements** - All buttons and links are functional with routing
- **Responsive Design** - Mobile-friendly layout using Bootstrap grid system
- **Custom Styling** - Enhanced with custom CSS animations and gradients

## 📁 Project Structure

```
bootsrap/
├── src/
│   ├── components/
│   │   ├── navbar.jsx       # Navigation bar with routing
│   │   ├── hero.jsx         # Hero section with CTA buttons
│   │   ├── cards.jsx        # Service cards with navigation
│   │   └── dropdown.jsx     # Interactive dropdown menu
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── About.jsx        # About/Project info page
│   │   ├── WebDevelopment.jsx
│   │   ├── FullStack.jsx
│   │   ├── UIUXDesign.jsx
│   │   ├── Frontend.jsx
│   │   ├── Backend.jsx
│   │   └── DataScience.jsx
│   ├── App.jsx              # Main app with routes
│   └── main.jsx             # Entry point
└── package.json
```

## 🛠️ Technologies Used

- **React** 19.2.0 - UI library
- **React Router DOM** 7.1.3 - Client-side routing
- **Bootstrap** 5.3.8 - CSS framework
- **React Bootstrap** 2.10.10 - Bootstrap components for React
- **Vite** 7.2.4 - Build tool and dev server

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, cards, and dropdown |
| `/about` | About | Project information and tech stack |
| `/web-development` | Web Development | Web development overview |
| `/full-stack` | Full Stack | Full stack development info |
| `/ui-ux-design` | UI/UX Design | Design principles and tools |
| `/frontend` | Frontend | Frontend technologies |
| `/backend` | Backend | Backend development |
| `/data-science` | Data Science | Data science and ML |

## 🎯 Key Components

### Navbar
- Responsive navigation with Home and About links
- Uses React Router Link components

### Hero Section
- Eye-catching header with call-to-action buttons
- Buttons navigate to About page

### Cards Section
- Three service cards (Web Dev, Full Stack, UI/UX)
- Each card button navigates to respective page

### Dropdown Menu
- Interactive dropdown with 4 career path options
- All items navigate to dedicated pages

## 👨‍💻 Author

**Sreekar Chimbili**  
Full Stack Development - Semester 6

## 📄 License

This project is created for educational purposes.
