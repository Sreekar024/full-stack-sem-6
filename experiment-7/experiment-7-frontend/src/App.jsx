import { useState } from 'react';
import { logout } from './api/apiService';
import './App.css';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Login';
import PostsList from './components/PostsList';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [editingPost, setEditingPost] = useState(null);
  const [refreshKey, setRefreshKey]   = useState(0);

  const handleLogin  = (loggedInUser) => setUser(loggedInUser);

  const handleLogout = async () => {
    try { await logout(); } catch { /* ignore */ }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setEditingPost(null);
  };

  const handleEdit    = (post) => setEditingPost(post);
  const handleCancel  = ()     => setEditingPost(null);
  const handleCreated = ()     => setRefreshKey((k) => k + 1);
  const handleUpdated = ()     => { setEditingPost(null); setRefreshKey((k) => k + 1); };

  if (!user) {
    return (
      <ErrorBoundary>
        <Login onLogin={handleLogin} />
      </ErrorBoundary>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Experiment 7 — API Integration &amp; Backend Communication</h1>
          <p>Real Express backend · JWT Auth · Full CRUD</p>
        </div>
        <div className="header-user">
          <span>Hello, <strong>{user.name}</strong></span>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <ErrorBoundary>
            {editingPost ? (
              <EditPost
                key={editingPost.id}
                post={editingPost}
                onUpdated={handleUpdated}
                onCancel={handleCancel}
              />
            ) : (
              <CreatePost onCreated={handleCreated} />
            )}
          </ErrorBoundary>
        </aside>

        <section className="content">
          <ErrorBoundary>
            <PostsList onEdit={handleEdit} refreshKey={refreshKey} />
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}

export default App;