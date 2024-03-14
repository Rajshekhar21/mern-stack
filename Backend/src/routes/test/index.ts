import { Router } from 'express';

import { HelloWorld } from '@/controllers/app.controller';

const router = Router();

router.get('/', HelloWorld);

export default router;
