import { useEffect, useState } from 'react';
import { deletePost, getPosts } from '../api/apiService';

function PostsList({ onEdit, refreshKey }) {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await getPosts();
        if (!cancelled) {
          setPosts(res.data.slice(0, 10));
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    load();
    return () => { cancelled = true; };
  }, [refreshKey]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  if (loading) return <p className="status">Loading posts…</p>;
  if (error)   return <p className="status error">Error: {error}</p>;

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {posts.length === 0 && <p>No posts found.</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            <h3>#{post.id} — {post.title}</h3>
            <p>{post.body}</p>
            <div className="post-actions">
              <button className="btn-edit" onClick={() => onEdit(post)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PostsList;
