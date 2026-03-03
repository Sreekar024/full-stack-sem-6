import React from 'react';
import { useSelector } from 'react-redux';
import './favoritesWidget.css';

function FavoritesWidget() {
  const favorites = useSelector(state => state.skills.favorites);

  return (
    <div className="favorites-widget">
      <span className="favorites-count">
        ❤️ {favorites.length}
      </span>
    </div>
  );
}

export default FavoritesWidget;
