require('dotenv').config();
require('module-alias/register');

import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import initiateMongoDB from '@/core/mongodb';
import initiateServiceParameters from '@/core/config';

import { raw, text, json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import PublicRoutes from '@/routes/public';
import TestRoutes from '@/routes/test';

const app = express();
const port = process.env.PORT || 5000;

initiateMongoDB();
initiateServiceParameters();

const initiateExpressListener = async () => {
  console.info('Initializing Node Server...');

  app.use(cors());
  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.xssFilter());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.frameguard({ action: 'sameorigin' }));
  app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));

  app.use(
    helmet.hsts({
      preload: true,
      includeSubDomains: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    }),
  );

  app.use(compression());
  app.use(raw({ limit: '50mb' }));
  app.use(text({ limit: '50mb' }));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.use(cookieParser());

  app.use((req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, timezone',
    );
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Content-Security-Policy', "default-src 'self' https://www.google.com;");
    next();
  });

  app.use('/', TestRoutes);
  app.use('/api', PublicRoutes);

  app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name && err.name === 'ValidationError') {
      const validationErrors: any[] = [];
      Object.keys(err.errors).forEach((key) => validationErrors.push(err.errors[key].message));
      res.status(422).send({
        success: false,
        error: true,
        status: 422,
        errors: validationErrors,
        title: err.title ? err.title : 'Validation error!',
        message: err.message
          ? err.message
          : 'Sorry, due to an validation error, we could not process your request at this time.',
      });
    } else if (err.formatter) {
      res.status(422).send({
        success: false,
        error: true,
        status: 422,
        errors: err.array(),
        title: err.title ? err.title : 'Validation error!',
        message: err.message
          ? err.message
          : 'Sorry, due to an validation error, we could not process your request at this time.',
      });
    } else if (err) {
      res.status(err.status ? err.status : 500).send({
        success: false,
        error: true,
        status: err.status ? err.status : 500,
        errors: err.errors ? err.errors : err,
        title: err.title ? err.title : 'Internal server error!',
        message:
          'Sorry, due to an internal server error, we could not process your request at this time.',
      });
    }
    next();
  });

  app.on('error', (error: any) => {
    console.error(error);
  });

  process.on('uncaughtException', (error: any) => {
    console.error(error);
  });

  app.listen(port);
};

mongoose.connection.on('connected', () => {
  initiateExpressListener()
    .then(() => {
      console.log('Node Server Initialized: ' + port);
    })
    .catch((error: any) => {
      console.error(error);
    });
});
