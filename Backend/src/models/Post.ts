import { Schema, model } from 'mongoose';

import { IPostModel } from '@/interfaces/post.interface';

const postSchema = new Schema<IPostModel>(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Post = model<IPostModel>('Post', postSchema, 'app_posts');

export default Post;
