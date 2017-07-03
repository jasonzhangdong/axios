import express from 'express';
import path from 'path';
import dashboard from './bl/dashboard';
import jwtcode from './middlewares/jwtauth';

const routers = express.Router();

routers.get('/', dashboard.entry);

routers.get('/user', dashboard.user);

routers.get('/peoper',dashboard.peoper);

routers.get('/getdata',dashboard.axiosget);

routers.post('/axiospost',dashboard.axiospost);

routers.get('/token',jwtcode.jwtcode, dashboard.gettoken);

export default routers;
