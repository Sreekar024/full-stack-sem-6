import React, { useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SkillsContext } from '../context/SkillsContext';
import BasicNavbar from '../components/navbar';
import './Portfolio.css';

function Reports() {
  const { state, dispatch } = useContext(SkillsContext);
  const { reports } = useSelector(state => state.skills);

  // useMemo: Calculate performance metrics from monthly data
  const performanceMetrics = useMemo(() => {
    const totalHours = reports.monthlyData.reduce((sum, month) => sum + month.hours, 0);
    const totalProjects = reports.monthlyData.reduce((sum, month) => sum + month.projects, 0);
    const avgHoursPerProject = totalProjects > 0 ? (totalHours / totalProjects).toFixed(1) : 0;
    const maxProjectMonth = reports.monthlyData.reduce((max, current) =>
      current.projects > max.projects ? current : max
    );
    
    return {
      totalHours,
      totalProjects,
      avgHoursPerProject,
      maxProjectMonth: maxProjectMonth.month,
      maxProjects: maxProjectMonth.projects
    };
  }, [reports.monthlyData]);

  // useMemo: Calculate monthly growth
  const monthlyGrowth = useMemo(() => {
    return reports.monthlyData.map((current, idx) => {
      if (idx === 0) return { ...current, growth: 0 };
      const prev = reports.monthlyData[idx - 1];
      const projectGrowth = ((current.projects - prev.projects) / prev.projects * 100).toFixed(1);
      const hoursGrowth = ((current.hours - prev.hours) / prev.hours * 100).toFixed(1);
      return { ...current, projectGrowth, hoursGrowth };
    });
  }, [reports.monthlyData]);

  const handleThemeToggle = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <div className={`reports-page ${state.theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <BasicNavbar />

      {/* Hero Section */}
      <section className="reports-hero gradient-bg py-5 text-white">
        <div className="container">
          <h1 className="display-4 mb-3">📊 Performance Reports</h1>
          <p className="lead mb-0">Comprehensive analytics and insights from your portfolio</p>
          <div className="mt-4">
            <button
              className="btn btn-light me-2"
              onClick={handleThemeToggle}
              title={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {state.theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-5 text-center">📈 Key Metrics</h2>
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="stat-card hover-lift">
                <div className="stat-number">{performanceMetrics.totalProjects}</div>
                <div className="stat-label">Total Projects</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-card hover-lift">
                <div className="stat-number">{performanceMetrics.totalHours}</div>
                <div className="stat-label">Total Hours Worked</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-card hover-lift">
                <div className="stat-number">{performanceMetrics.avgHoursPerProject}</div>
                <div className="stat-label">Avg Hours/Project</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="stat-card hover-lift">
                <div className="stat-number">{performanceMetrics.maxProjects}</div>
                <div className="stat-label">Peak Projects ({performanceMetrics.maxProjectMonth})</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Breakdown */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-5 text-center">📅 Monthly Breakdown</h2>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Month</th>
                  <th>Projects</th>
                  <th>Hours</th>
                  <th>Growth (Projects)</th>
                  <th>Growth (Hours)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyGrowth.map((month, idx) => (
                  <tr key={idx}>
                    <td><strong>{month.month}</strong></td>
                    <td>
                      <span className="badge bg-primary">{month.projects}</span>
                    </td>
                    <td>
                      <span className="badge bg-info">{month.hours} hrs</span>
                    </td>
                    <td>
                      {month.projectGrowth !== 0 ? (
                        <span className={`badge ${month.projectGrowth > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {month.projectGrowth > 0 ? '📈' : '📉'} {Math.abs(month.projectGrowth)}%
                        </span>
                      ) : (
                        <span className="badge bg-secondary">—</span>
                      )}
                    </td>
                    <td>
                      {month.hoursGrowth !== 0 ? (
                        <span className={`badge ${month.hoursGrowth > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {month.hoursGrowth > 0 ? '📈' : '📉'} {Math.abs(month.hoursGrowth)}%
                        </span>
                      ) : (
                        <span className="badge bg-secondary">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center">📋 Summary</h2>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Performance Overview</h5>
                  <p className="card-text">
                    Over the past 6 months, you've completed <strong>{performanceMetrics.totalProjects} projects</strong> 
                    and worked <strong>{performanceMetrics.totalHours} hours</strong>. Your most productive month was 
                    <strong> {performanceMetrics.maxProjectMonth}</strong> with <strong>{performanceMetrics.maxProjects} projects</strong>.
                  </p>
                  <p className="card-text">
                    On average, each project takes <strong>{performanceMetrics.avgHoursPerProject} hours</strong> to complete. 
                    This data demonstrates consistent productivity and dedication to your craft.
                  </p>
                  <hr />
                  <small className="text-muted">
                    💡 Tip: This page demonstrates Redux selectors, useMemo optimization, and Context-based theming.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reports;
