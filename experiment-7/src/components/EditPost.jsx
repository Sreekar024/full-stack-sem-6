import { useState } from 'react';
import { updatePost } from '../api/apiService';

// The parent passes key={post.id} so React remounts on post change,
// resetting all state automatically — no useEffect needed.
function EditPost({ post, onUpdated, onCancel }) {
  const [title, setTitle]   = useState(post.title);
  const [body, setBody]     = useState(post.body);
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setErrMsg('Title and body are required.');
      return;
    }
    setStatus('pending');
    setErrMsg('');
    try {
      const res = await updatePost(post.id, { title, body, userId: post.userId });
      console.log('Updated:', res.data);
      setStatus('success');
      if (onUpdated) onUpdated(res.data);
    } catch (err) {
      setErrMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <section className="form-section">
      <h2>Edit Post #{post.id}</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={status === 'pending'}
          />
        </label>
        <label>
          Body
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            disabled={status === 'pending'}
          />
        </label>
        {errMsg && <p className="form-error">{errMsg}</p>}
        {status === 'success' && (
          <p className="form-success">Post updated successfully!</p>
        )}
        <div className="form-buttons">
          <button type="submit" disabled={status === 'pending'}>
            {status === 'pending' ? 'Saving…' : 'Save Changes'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditPost;
