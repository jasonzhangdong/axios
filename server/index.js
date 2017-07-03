import express from 'express';
import http from 'http';
import expressHandlebars from 'express-handlebars';
import session from 'express-session';
import connectRedis from 'connect-redis';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import log4js from 'log4js';
import config from './config';
import models from './models';
import routers from './routers';
import mylog, { logger } from './middlewares/mylog';


mylog.init();

let isDev = config.isDedv;

let app = express();
let server = http.Server(app);



// set favicon
app.use(favicon(path.join(__dirname, '../views/favicon.png')));
app.use(express.static(path.join(__dirname, '../upload')));
// set views folder
app.set('views', path.join(__dirname, '../views'));
// for parsing application/json 
app.use(bodyParser.json({ limit: '10mb' }));
// for parsing application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 12000 }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Token, token");
    next();
});

// cookie parser
app.use(cookieParser(config.session_secret));

// set handlebars engine
const handlebars = expressHandlebars.create({
    extname: '.html',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    defaultLayout: 'portal',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

if (!isDev) {
    app.set('view cache', true);
}

app.disable('x-powered-by');


if (!config.use_redis) {
    app.use(session({
        secret: config.session_secret,
        resave: false,
        saveUninitialized: true
    }));

} else {
    const RedisStore = connectRedis(session);
    app.use(session({
        secret: config.session_secret,
        store: new RedisStore({
            port: config.redis_port,
            host: config.redis_host,
        }),
        resave: true,
        saveUninitialized: true,
    }));
}

app.locals.env = process.env.NODE_ENV || 'dev';

if (isDev) {
    app.use(express.static(path.join(__dirname, '../client')));
} else {
    app.use(express.static(path.join(__dirname, '../dist')));
}

app.use(mylog.logAccess);

app.use('/', routers);

// http 404 handler
app.use((req, res, next) => {
    logger.error('404:', req.url);
    res.status(404);
    res.render('404', { layout: null });
});

// http 500 handler
app.use((err, req, res, next) => {
    logger.error('500', err.stack);
    res.status(500);
    res.render('500', { layout: null });
});

server.listen(config.port, function () {
    logger.info(`App (production) is now running on port ${config.port}!`);
});


logger.info('Ready for LCPSP-GCJL service ...');

process.on('uncaughtException', function (err) {
    logger.error('UNCAUGHTEXCEPTION:', err);
});