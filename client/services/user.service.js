import { apiPrefix } from '../../etc/config.json';
import authHeader from '../helpers/auth-header';
import popupTools from "popup-tools";

const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiPrefix}/users/auth`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // сохраняем пользовательские данные и токен jwt в хранилище, чтобы пользователь мог войти в систему между обновлениями страниц
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
};

const socialNetworkLogin = (socialNetwork) => {
    return new Promise( (resolve, reject) => {
        return popupTools.popup(
            `${apiPrefix}/users/auth/` + socialNetwork,
            socialNetwork + " connect",
            {
                width: 400,
                height: 500
            },
            (err, user) => (user) ? resolve(user) : reject(err.message)
        )
    }).then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
};

const logout = () => {
    // удаляем юзера из хранилища
    localStorage.removeItem('user');
};

const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiPrefix}/users`, requestOptions).then(handleResponse);
};

const getById = (id) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiPrefix}/users/${id}`, requestOptions).then(handleResponse);
};

const register = (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiPrefix}/users/register`, requestOptions).then(handleResponse);
};

const update = (user) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiPrefix}/users/${user.id}`, requestOptions).then(handleResponse);
};

const updateProfilePhoto = (user) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'form-data' },
        body: user.profile_photo
    };
console.log("service");
    return fetch(`${apiPrefix}/users/${user.id}`, requestOptions).then(handleResponse);
};

const _delete = (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiPrefix}/users/${id}`, requestOptions).then(handleResponse);
};

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // автоматический выход, если от API получен ответ 401
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

export const userService = {
    login,
    socialNetworkLogin,
    logout,
    register,
    getAll,
    getById,
    update,
    updateProfilePhoto,
    delete: _delete
};