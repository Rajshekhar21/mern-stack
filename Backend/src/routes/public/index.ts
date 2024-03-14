import { Router } from 'express';

import { createPostValidator, updatePostValidator } from '@/validators/post.validator';
import {
  _getPosts,
  _getPost,
  _createPost,
  _updatePost,
  _deletePost,
} from '@/controllers/post.controller';

const router = Router();

router.get('/posts', _getPosts);
router.get('/posts/:id', _getPost);
router.post('/posts', _createPost);
router.put('/posts/:id',  _updatePost);
router.delete('/posts/:id', _deletePost);

export default router;
