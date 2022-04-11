import cookieParser from 'cookie-parser';
import { Router } from 'express';

import { arrayColumnsRouter } from './arrayColumns.routes';
import { columnRouter } from './column.routes';
import { sectionRouter } from './section.routes';
import { taskRouter } from './tasks.routes';
import { userTaskRouter } from './taskUserLimit.routes';
import { userRoutes } from './user.routes';

const router = Router();

router.use(cookieParser());

taskRouter(router);
columnRouter(router);
sectionRouter(router);
userRoutes(router);
arrayColumnsRouter(router);
userTaskRouter(router);
export default router;
