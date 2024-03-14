import { NextFunction, Request, Response } from 'express';

export const HelloWorld = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send({
      success: true,
      data: 'Hello World!',
      title: 'Welcome to test!',
      message: 'This is an api service for test based on Node.JS app architecture.',
    });
  } catch (error: any) {
    return next(error);
  }
};
