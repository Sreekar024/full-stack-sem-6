import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  cart: [],
  products: [
    { id: 1, name: 'React Course', price: 99, category: 'Frontend', emoji: '⚛️', description: 'Learn React fundamentals and advanced concepts' },
    { id: 2, name: 'Redux Mastery', price: 79, category: 'State', emoji: '🎯', description: 'Master state management with Redux Toolkit' },
    { id: 3, name: 'Web Design', price: 89, category: 'Design', emoji: '🎨', description: 'Modern UI/UX design principles and practices' },
    { id: 4, name: 'JavaScript Pro', price: 109, category: 'Frontend', emoji: '📚', description: 'Advanced JavaScript patterns and techniques' },
    { id: 5, name: 'Node.js Backend', price: 119, category: 'Backend', emoji: '🚀', description: 'Build scalable backend applications' },
    { id: 6, name: 'Web Performance', price: 99, category: 'Optimization', emoji: '⚡', description: 'Optimize and scale web applications' }
  ],
  portfolio: {
    name: 'Alex Developer',
    title: 'Full Stack Developer',
    bio: 'Passionate about building amazing web applications',
    experience: [
      { id: 1, company: 'Tech Corp', position: 'Senior Developer', year: '2022-2024' },
      { id: 2, company: 'StartUp Inc', position: 'Junior Developer', year: '2020-2022' },
      { id: 3, company: 'Design Studio', position: 'Intern', year: '2019-2020' }
    ],
    skills: [
      { id: 1, name: 'React', category: 'Frontend', level: 'Advanced' },
      { id: 2, name: 'Node.js', category: 'Backend', level: 'Advanced' },
      { id: 3, name: 'JavaScript', category: 'Frontend', level: 'Expert' },
      { id: 4, name: 'MongoDB', category: 'Database', level: 'Intermediate' },
      { id: 5, name: 'CSS/Bootstrap', category: 'Frontend', level: 'Advanced' },
      { id: 6, name: 'Express', category: 'Backend', level: 'Advanced' }
    ]
  },
  reports: {
    projectsCompleted: 15,
    clientsSatisfied: 12,
    hoursWorked: 2400,
    monthlyData: [
      { month: 'Jan', projects: 2, hours: 180 },
      { month: 'Feb', projects: 3, hours: 220 },
      { month: 'Mar', projects: 2, hours: 200 },
      { month: 'Apr', projects: 4, hours: 280 },
      { month: 'May', projects: 2, hours: 160 },
      { month: 'Jun', projects: 2, hours: 190 }
    ]
  }
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.find(fav => fav.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(i => i.id !== action.payload.id);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    }
  },
});

export const { addFavorite, removeFavorite, clearFavorites, addToCart, removeFromCart, updateCartQuantity, clearCart } = skillsSlice.actions;
export default skillsSlice.reducer;
