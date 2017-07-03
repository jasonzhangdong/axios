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
  user(req, res, next) {
    res.json({ 'name': 'jason', 'age': 35 });
  },
  getuser(req, res, next) {
    return res.render(
      'user', {
        layout: 'portal',
        menu: '客户姓名',
        title: '客户姓名一览表',
      }
    )
  },
  peoper(req, res, next) {
    return res.render('peoper');
  },
  axiosget(req, res, next) {
    console.log('第一个执行的函数', req.query);
    return res.json({ 'zds': 'jason' });
  },

  axiospost(req, res, next) {
    console.log('第二个执行的函数', req.body);

    //生成token
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
      iss: 'bi234kadml1934kdamxmk87',
      name: 'jaosn',
      pwd: '781220zz',
      age: 32,
      exp: expires
    }, config.jwt_token_secret);


    return res.json({
      token: token,
      expires: expires
    });
  },
  gettoken(req, res, next) {

    console.log('header_token==11111===', req.token);

    res.json({ 'token': req.token });
  }

};

