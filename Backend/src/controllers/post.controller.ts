import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

import { IPostModel } from '@/interfaces/post.interface';
import { getPost, getPosts, createPost, updatePost, deletePost } from '@/services/post.service';

export const _getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postsData = await getPosts(next);
    return res.send({
      success: true,
      title: 'Posts sent successfully!',
      message: 'All of the posts sent successfully.',
      data: postsData,
    });
  } catch (error) {
    return next(error);
  }
};

export const _getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params?.id;
    const post = await getPost(postId, next);
    if (post) {
      return res.send({
        success: true,
        title: 'Posts sent successfully!',
        message: 'All of the posts sent successfully.',
        data: { post },
      });
    }
    return next({
      status: 404,
      title: 'Post not found!',
      message: 'Seems like the post you looking for is not found.',
    });
  } catch (error) {
    return next(error);
  }
};

export const _createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _errors = validationResult(req);
    const _request = req.body;
    console.log('---->', req.body);

    if (!_errors.isEmpty()) {
      return next(_errors);
    } else {
      const _post: IPostModel = {
        postId: uuidv4(),
        title: _request.title,
        body: _request.body,
      };
      const post = await createPost(_post, next);
      return res.send({
        success: true,
        title: 'Post created successfully!',
        message: 'Post has been created successfully.',
        data: { post },
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const _updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _errors = validationResult(req);

    const _request = req.body;
    const postId = req.params?.id;
    if (!_errors.isEmpty()) {
      return next(_errors);
    } else {
      console.log('---------------->', postId, _request);

      const post = await updatePost(postId, _request, next);
      if (post.modifiedCount == 0) {
        return next({
          status: 404,
          title: 'Post not found!',
          message: 'Seems like the post you looking for is not found.',
        });
      }
      return res.send({
        success: true,
        title: 'Post updated successfully!',
        message: 'Post has been updated successfully.',
        data: { post },
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const _deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params?.id;
    const post = await deletePost(postId, next);
    if (post.deletedCount == 0) {
      return next({
        status: 404,
        title: 'Post not found!',
        message: 'Seems like the post you looking for is not found.',
      });
    }
    return res.send({
      success: true,
      title: 'Post deleted successfully!',
      message: 'Post has been deleted successfully.',
      data: { post },
    });
  } catch (error) {
    return next(error);
  }
};
