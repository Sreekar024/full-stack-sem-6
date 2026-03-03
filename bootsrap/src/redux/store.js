import { configureStore } from '@reduxjs/toolkit';
import skillsSlice from './slices/skillsSlice';

export const store = configureStore({
  reducer: {
    skills: skillsSlice,
  },
});

export default store;
