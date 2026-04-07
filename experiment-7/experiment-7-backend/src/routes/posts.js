import express from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    getPostById,
    updatePost,
} from '../data/store.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/posts — public
router.get('/', (_req, res) => {
  res.json(getAllPosts());
});

// GET /api/posts/:id — public
router.get('/:id', (req, res) => {
  const post = getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// POST /api/posts — protected (JWT required)
router.post('/', verifyToken, (req, res) => {
  const { title, body } = req.body;
  if (!title?.trim() || !body?.trim()) {
    return res.status(400).json({ message: 'Title and body are required' });
  }
  const post = createPost({ title: title.trim(), body: body.trim(), userId: req.user.id });
  res.status(201).json(post);
});

// PUT /api/posts/:id — protected (JWT required)
router.put('/:id', verifyToken, (req, res) => {
  const { title, body } = req.body;
  if (!title?.trim() || !body?.trim()) {
    return res.status(400).json({ message: 'Title and body are required' });
  }
  const post = updatePost(req.params.id, { title: title.trim(), body: body.trim() });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// DELETE /api/posts/:id — protected (JWT required)
router.delete('/:id', verifyToken, (req, res) => {
  const deleted = deletePost(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Post not found' });
  res.status(200).json({ message: 'Post deleted successfully' });
});

export default router;
