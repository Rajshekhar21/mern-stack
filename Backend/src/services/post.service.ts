import { NextFunction } from 'express';

import { IPostModel } from '@/interfaces/post.interface';

import Post from '@/models/Post';

export const getPosts = async (next: NextFunction): Promise<IPostModel[] | any> => {
  try {
    const docPosts: IPostModel[] = await Post.find({});
    return {
      posts: docPosts,
    };
  } catch (error) {
    throw error;
  }
};

export const getPost = async (_postId: string, next: NextFunction): Promise<IPostModel | any> => {
  try {
    const docPost: IPostModel[] = await Post.findOne({ postId: _postId });
    if (!docPost) {
      return next({
        status: 404,
        title: 'Post not found!',
        message: 'Seems like the post you looking for is not found.',
      });
    }
    return docPost;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (
  _post: IPostModel,
  next: NextFunction,
): Promise<IPostModel | any> => {
  try {
    const docPost: IPostModel = await Post.create(_post);
    return docPost;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (
  _postId: string,
  _post: any,
  next: NextFunction,
): Promise<IPostModel | any> => {
  try {
    const docPost: any = await Post.updateOne({ postId: _postId }, _post);
    return docPost;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (
  _postId: string,
  next: NextFunction,
): Promise<IPostModel | any> => {
  try {
    const docPost: any = await Post.deleteOne({ postId: _postId });
    return docPost;
  } catch (error) {
    throw error;
  }
};
