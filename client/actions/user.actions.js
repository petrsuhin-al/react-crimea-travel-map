import userConstants from '../constants/user.constants';
import { userService } from '../services/user.service';
import { alertActions } from './alert.actions';
import history from '../helpers/history';

const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    //history.push('/account');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
};

const injectUser = (user = {}) => {
    return {
        type: userConstants.LOGIN_SUCCESS,
        payload: {
            user
        }
    };
};

const socialNetworkLogin = (socialNetwork) => {
    return dispatch => {
        //dispatch(request("")); // попробовать потом реализовать функцию диспатча регвеста

        userService.socialNetworkLogin(socialNetwork)
            .then(
                user => {
                    console.log(user);
                    dispatch(success(user));
                },
                err => {
                    history.push('/account');
                    dispatch(failure(err.toString()));
                    dispatch(alertActions.error(err.toString()));
                }
            )

    };

    //function request(l) { return { type: userConstants.SN_LOGIN_REQUEST, l } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
};

const logout = () => {
    userService.logout();
    return { type: userConstants.LOGOUT };
};

const register = (user) => {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/account');
                    dispatch(alertActions.success('Добро пожаловать в TRIPSBANK CRIMEA!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
};

const update = (user) => {
    return dispatch => {
        dispatch(request(user));

        userService.updateProfilePhoto(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
};

const getAll = () => {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_ALL_REQUEST } }
    function success(users) { return { type: userConstants.GET_ALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_ALL_FAILURE, error } }
};

// имя функции с подчеркиванием в начале, потому, что удаление является зарезервированным словом
const _delete = (id) => {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                    history.push('/');
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
};

const userActions = { login, socialNetworkLogin, injectUser, logout, update, register, getAll, delete: _delete };
export default userActions;