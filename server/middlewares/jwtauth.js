import jwt from 'jwt-simple';
import config from '../config';

module.exports={
    jwtcode(req,res,next){
        console.log('jwt',req.headers.token);

        let decoded = jwt.decode(req.headers.token,config.jwt_token_secret);

        console.log('decode===',decoded);

        req.token = decoded;

        next();
    }
}