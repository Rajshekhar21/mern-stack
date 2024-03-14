import { check } from 'express-validator';

export const createPostValidator = [
  check('title', 'Post title is not valid').exists().notEmpty(),
  check('body', 'Post body is not valid').exists().notEmpty(),
];

export const updatePostValidator = [
  check('title', 'Post title is not valid').isString().optional({ checkFalsy: false }),
  check('body', 'Post body is not valid').isString().optional({ checkFalsy: false }),
];
