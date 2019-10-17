import expressJwt from 'express-jwt';
import config from '../../etc/config.json';
import userControllers from '../controllers/user.controllers';

const jwt = () => {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // публичные маршруты, которые не требуют аутентификации
            '/users/authenticate',
            '/users/register',
            '/locations',
            '/cities'
        ]
    });
};

export default jwt;

async function isRevoked(req, payload, done) {
    const user = await userControllers.getUserById(payload.sub);
    // токен не нужен, если пользователя не существует
    if (!user) {
        return done(null, true);
    }
    done();
}