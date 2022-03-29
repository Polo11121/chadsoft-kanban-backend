import cookieParser from 'cookie-parser';
import { Router } from 'express';

import { arrayColumnsRouter } from './arrayColumns.routes';
// import { userRoutes } from '../Logowanie/user.routes';
import { columnRouter } from './column.routes';
import { memberRouter } from './members.routes';
import { sectionRouter } from './section.routes';
import { taskRouter } from './tasks.routes';

const router = Router();

router.use(cookieParser());

taskRouter(router);
columnRouter(router);
sectionRouter(router);
memberRouter(router);
arrayColumnsRouter(router);
// userRoutes(router);
export default router;
