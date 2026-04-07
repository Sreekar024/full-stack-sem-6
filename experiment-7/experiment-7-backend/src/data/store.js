// In-memory posts store — seeded with sample data
let posts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Sample Post ${i + 1}`,
  body: `This is the body content of post number ${i + 1}. Edit or delete it to try CRUD operations.`,
  userId: 1,
  createdAt: new Date().toISOString(),
}));

let nextId = 11;

export const getAllPosts = () => [...posts];

export const getPostById = (id) =>
  posts.find((p) => p.id === parseInt(id));

export const createPost = ({ title, body, userId }) => {
  const post = {
    id: nextId++,
    title,
    body,
    userId,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  return post;
};

export const updatePost = (id, { title, body }) => {
  const idx = posts.findIndex((p) => p.id === parseInt(id));
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], title, body, updatedAt: new Date().toISOString() };
  return posts[idx];
};

export const deletePost = (id) => {
  const idx = posts.findIndex((p) => p.id === parseInt(id));
  if (idx === -1) return false;
  posts.splice(idx, 1);
  return true;
};
