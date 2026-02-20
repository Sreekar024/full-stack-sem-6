import React, { useContext, useMemo } from 'react';
import { SkillsContext } from '../context/SkillsContext';
import './statsSummary.css';

function StatsSummary() {
  const { state } = useContext(SkillsContext);

  // useMemo: Calculate summary stats
  const summary = useMemo(() => {
    return {
      totalSkills: state.portfolio.skills.length,
      totalExperience: state.portfolio.experience.length,
      totalFavorites: state.favorites.length,
      theme: state.theme
    };
  }, [state.portfolio.skills, state.portfolio.experience, state.favorites, state.theme]);

  return (
    <div className="stats-summary">
      <div className="summary-item">
        <div className="summary-icon">💪</div>
        <div className="summary-content">
          <span className="summary-number">{summary.totalSkills}</span>
          <span className="summary-label">Skills</span>
        </div>
      </div>
      <div className="summary-item">
        <div className="summary-icon">🏆</div>
        <div className="summary-content">
          <span className="summary-number">{summary.totalExperience}</span>
          <span className="summary-label">Experiences</span>
        </div>
      </div>
      <div className="summary-item">
        <div className="summary-icon">❤️</div>
        <div className="summary-content">
          <span className="summary-number">{summary.totalFavorites}</span>
          <span className="summary-label">Favorites</span>
        </div>
      </div>
      <div className="summary-item">
        <div className="summary-icon">{summary.theme === 'light' ? '☀️' : '🌙'}</div>
        <div className="summary-content">
          <span className="summary-label">Theme: {summary.theme}</span>
        </div>
      </div>
    </div>
  );
}

export default StatsSummary;
