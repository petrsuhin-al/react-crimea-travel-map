import passport from "passport";
import userControllers from '../controllers/user.controllers';
import multerUpload from '../helpers/multer-settings';
import popupTools from "popup-tools";
import '../helpers/passport.strategies';

const authUser = (req, res, next) => { // аутентификация пользователя
    userControllers.authenticateUser(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Не правильные имя пользователя или пароль' }))
        .catch(err => next(err));
};

const facebookAuthUserCB = (req, res, next) => {
    if(req.user){
        res.end(popupTools.popupResponse(req.user));
    } else {
        next(req.err)
    }
};

const registerUser = (req, res, next) => { // регистрация нового пользователя
    userControllers.createUser(req.body)
        .then(() => res.json(req.body))
        .catch(err => next(err));
};

const getAllUsers = (req, res, next) => { // получение всех пользователей
    userControllers.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
};

const getCurrentUser = (req, res, next) => {  //  получение определенного пользователя
    userControllers.getUserById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
};

const getUserById = (req, res, next) => {  // получение пользователя по id
    userControllers.getUserById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
};

const updateUser = (req, res, next) => { // обновление пользователя по id
    userControllers.updateUser(req.params.id, req.body, (req.file) ? req.file.path : false) // проверяем на содержание файла в последнем параметре
        .then(() => res.json(req.body))
        .catch(err => next(err));
};

const _deleteUser = (req, res, next) => { // удаление пользователя по id
    userControllers.deleteUser(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
};

export default (app) => {
    const urlPrefix = '/users';
    app.post(urlPrefix + '/auth', authUser);
    app.get(urlPrefix + '/auth/facebook', passport.authenticate('facebook', {authType: 'rerequest', display: 'popup', scope: ['user_birthday', 'user_gender', 'email', 'public_profile']}));
    app.get(urlPrefix + '/auth/facebook/callback', passport.authenticate('facebook'), facebookAuthUserCB);
    app.post(urlPrefix + '/register', registerUser);
    app.get(urlPrefix, getAllUsers);
    app.get(urlPrefix + '/current', getCurrentUser);
    app.get(urlPrefix + '/:id', getUserById);
    app.put(urlPrefix + '/:id', multerUpload.single('image'), updateUser);
    app.delete(urlPrefix + '/:id', _deleteUser);
};