import { Router } from 'express';

import { columnRouter } from './column.routes';
import { taskRouter } from './tasks.routes';
import { userRouter } from './user.routes';

const router = Router();
taskRouter(router);
columnRouter(router);
userRouter(router);
export default router;
