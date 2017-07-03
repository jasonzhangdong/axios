import express from 'express';
import path from 'path';
import dashboard from './bl/dashboard';

const routers = express.Router();

routers.get('/', dashboard.entry);

routers.get('/user', dashboard.user);

export default routers;
