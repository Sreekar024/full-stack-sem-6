import React, { useContext } from 'react';
import { SkillsContext } from '../context/SkillsContext';

function ThemeToggle() {
  const { state, dispatch } = useContext(SkillsContext);

  return (
    <button
      className="btn btn-outline-warning ms-2"
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      title="Toggle theme"
    >
      {state.theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;
