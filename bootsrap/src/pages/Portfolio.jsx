import React, { useContext, useMemo } from 'react';
import { SkillsContext } from '../context/SkillsContext';
import BasicNavbar from '../components/navbar';
import './Portfolio.css';

function Portfolio() {
  const { state, dispatch } = useContext(SkillsContext);
  const portfolio = state.portfolio;

  // useMemo: Calculate statistics about skills
  const skillStats = useMemo(() => {
    const stats = {
      totalSkills: portfolio.skills.length,
      byCategory: {},
      byLevel: {}
    };

    portfolio.skills.forEach(skill => {
      // Count by category
      stats.byCategory[skill.category] = (stats.byCategory[skill.category] || 0) + 1;
      // Count by level
      stats.byLevel[skill.level] = (stats.byLevel[skill.level] || 0) + 1;
    });

    return stats;
  }, [portfolio.skills]);

  // useMemo: Filter favorites that are skills
  const favoriteSkills = useMemo(() => {
    return state.favorites.filter(fav => fav.category);
  }, [state.favorites]);

  // useMemo: Calculate experience years
  const totalExperience = useMemo(() => {
    return portfolio.experience.length;
  }, [portfolio.experience]);

  const toggleFavorite = (skill) => {
    const isFavorited = favoriteSkills.some(fav => fav.id === skill.id);
    if (isFavorited) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: skill.id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: skill });
    }
  };

  const isFavorited = (skillId) => {
    return favoriteSkills.some(fav => fav.id === skillId);
  };

  return (
    <div className={`portfolio-page ${state.theme === 'dark' ? 'dark-theme' : ''}`}>
      <BasicNavbar />

      {/* Hero Section */}
      <section className="portfolio-hero gradient-bg py-5">
        <div className="container text-white">
          <h1 className="display-4 mb-3">🎯 {portfolio.name}</h1>
          <p className="lead mb-0">{portfolio.title}</p>
          <p className="mb-3">{portfolio.bio}</p>
          <button
            className="btn btn-light me-2"
            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          >
            {state.theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </section>

      {/* Analytics/Stats Section */}
      <section className="stats-section py-5">
        <div className="container">
          <h2 className="mb-5 text-center">📊 Portfolio Analytics</h2>
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="stat-card hover-lift">
                <div className="stat-number">{skillStats.totalSkills}</div>
                <div className="stat-label">Total Skills</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-card hover-lift">
                <div className="stat-number">{Object.keys(skillStats.byCategory).length}</div>
                <div className="stat-label">Categories</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-card hover-lift">
                <div className="stat-number">{totalExperience}</div>
                <div className="stat-label">Experience Roles</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-card hover-lift">
                <div className="stat-number">{favoriteSkills.length}</div>
                <div className="stat-label">Favorite Skills</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="categories-section py-5 bg-light">
        <div className="container">
          <h2 className="mb-5 text-center">📚 Skills by Category</h2>
          <div className="row g-4">
            {Object.entries(skillStats.byCategory).map(([category, count]) => (
              <div key={category} className="col-md-4 col-sm-6">
                <div className="category-card">
                  <div className="category-icon">
                    {category === 'Frontend' && '🎨'}
                    {category === 'Backend' && '⚙️'}
                    {category === 'Database' && '🗄️'}
                  </div>
                  <h5 className="mt-3">{category}</h5>
                  <p className="category-count">{count} Skills</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid with Favorites */}
      <section className="skills-section py-5">
        <div className="container">
          <h2 className="mb-5 text-center">💪 Skills Showcase</h2>
          <div className="row g-3">
            {portfolio.skills.map(skill => (
              <div key={skill.id} className="col-md-4 col-sm-6">
                <div className={`skill-card ${isFavorited(skill.id) ? 'favorited' : ''}`}>
                  <div className="skill-header">
                    <h5>{skill.name}</h5>
                    <button
                      className="btn btn-sm btn-favorite"
                      onClick={() => toggleFavorite(skill)}
                      title={isFavorited(skill.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorited(skill.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <p className="skill-category">{skill.category}</p>
                  <div className="skill-level">
                    <span className={`badge bg-${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {favoriteSkills.length > 0 && (
            <div className="mt-5">
              <h3 className="mb-4">❤️ Your Favorite Skills</h3>
              <div className="favorites-list">
                {favoriteSkills.map(skill => (
                  <span key={skill.id} className="favorite-badge me-2 mb-2">
                    {skill.name}
                    <button
                      className="btn-remove"
                      onClick={() => dispatch({ type: 'REMOVE_FAVORITE', payload: skill.id })}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <button
                className="btn btn-outline-danger mt-3"
                onClick={() => dispatch({ type: 'CLEAR_FAVORITES' })}
              >
                Clear All Favorites
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section py-5 bg-light">
        <div className="container">
          <h2 className="mb-5 text-center">🏢 Professional Experience</h2>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {portfolio.experience.map((exp, index) => (
                <div key={exp.id} className="experience-item">
                  <div className="experience-timeline">
                    <div className="timeline-dot"></div>
                    {index !== portfolio.experience.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  <div className="experience-content">
                    <h5>{exp.position}</h5>
                    <p className="company-name">{exp.company}</p>
                    <small className="text-muted">{exp.year}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getLevelColor(level) {
  switch (level) {
    case 'Expert':
      return 'danger';
    case 'Advanced':
      return 'warning';
    case 'Intermediate':
      return 'info';
    default:
      return 'secondary';
  }
}

export default Portfolio;
