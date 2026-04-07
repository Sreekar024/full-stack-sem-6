import { useState } from 'react';
import { createPost } from '../api/apiService';

function CreatePost({ onCreated }) {
  const [title, setTitle]   = useState('');
  const [body, setBody]     = useState('');
  const [status, setStatus] = useState('idle'); // idle | pending | success | error
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
      const res = await createPost({ title, body, userId: 1 });
      console.log('Created:', res.data);
      setStatus('success');
      setTitle('');
      setBody('');
      if (onCreated) onCreated(res.data);
    } catch (err) {
      setErrMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <section className="form-section">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            disabled={status === 'pending'}
          />
        </label>
        <label>
          Body
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Post body"
            rows={4}
            disabled={status === 'pending'}
          />
        </label>
        {errMsg && <p className="form-error">{errMsg}</p>}
        {status === 'success' && (
          <p className="form-success">Post created successfully!</p>
        )}
        <button type="submit" disabled={status === 'pending'}>
          {status === 'pending' ? 'Submitting…' : 'Create Post'}
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
