import React, { useContext } from 'react';
import { SkillsContext } from '../context/SkillsContext';
import './favoritesWidget.css';

function FavoritesWidget() {
  const { state, dispatch } = useContext(SkillsContext);

  if (state.favorites.length === 0) {
    return null;
  }

  return (
    <div className="favorites-widget">
      <div className="favorites-header">
        <h6>❤️ Favorites ({state.favorites.length})</h6>
      </div>
      <div className="favorites-items">
        {state.favorites.slice(0, 3).map(item => (
          <div key={item.id} className="favorite-item">
            <span>{item.name}</span>
            <button
              className="btn-remove-small"
              onClick={() => dispatch({ type: 'REMOVE_FAVORITE', payload: item.id })}
            >
              ×
            </button>
          </div>
        ))}
        {state.favorites.length > 3 && (
          <div className="favorite-item more-indicator">
            +{state.favorites.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesWidget;
