import { NextFunction } from 'express';
import axios from 'axios';

export const post = async (url: string, headers: object, data: any, next: NextFunction) => {
  try {
    var options = {
      method: 'POST',
      url: url,
      data: data,
      headers: headers || {
        'Content-type': 'application/json',
      },
    };
    return await axios.request(options);
  } catch (error) {
    throw error;
  }
};

export const get = async (url: string, headers: object, next: NextFunction) => {
  try {
    const options = {
      method: 'POST',
      url: url,
      headers: headers || {
        'Content-type': 'application/json',
      },
    };
    return await axios.request(options);
  } catch (error) {
    throw error;
  }
};
