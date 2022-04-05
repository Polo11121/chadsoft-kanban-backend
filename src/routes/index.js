const cookieParser = require('cookie-parser');
const { Router } = require('express');

const arrayColumnsRouter = require('./arrayColumns.routes');
const columnRouter = require('./column.routes');
const sectionRouter = require('./section.routes');
const taskRouter = require('./tasks.routes');
const userRoutes = require('./user.routes');
const photoRouter = require('./photo.routes');

const router = Router();

router.use(cookieParser());

taskRouter(router);
columnRouter(router);
sectionRouter(router);
userRoutes(router);
arrayColumnsRouter(router);
photoRouter(router);
module.exports = router;
