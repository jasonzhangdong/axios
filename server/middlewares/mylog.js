import log4js from 'log4js';
import path from 'path';

let accessLogger;

export let logger;

export default {
  init() {
    log4js.configure(path.join(__dirname, '../log4js.config.json'), {reloadSecs: 120});
    accessLogger = log4js.getLogger('access');
    logger = log4js.getLogger('app');
  },

  logAccess(req, res, next) {
    let userInfo = 'anonymous';
    let ip;

    if (req.session && req.session.user) {
      let u = req.session.user;
      userInfo = `${u.loginName}`;
    }

    ip = req.headers['x-forwarded-for'] 
      || req.ip 
      || req._remoteAddress 
      || (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress)));


    accessLogger.info(`${userInfo}@${ip} ${req.method} ${req.originalUrl} ${req.headers['referer'] || req.headers['referrer'] || ''} \n ${req.get("User-Agent")}`);
    next();
  }
}

