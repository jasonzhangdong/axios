import { logger } from '../middlewares/mylog';
import config from '../config';

export default {
  entry(req, res, next) {
    return res.render(
      'dashboard',
      {
        layout: 'portal',
        menu: 'dashboard',
        title: 'Dashboard',
      }
    );
  },
  user(req,res,next){
    res.json({'name':'jason','age':35});
  }
};

