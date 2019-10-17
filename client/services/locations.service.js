import { apiPrefix } from '../../etc/config.json';

const getById= (id) => {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${apiPrefix}/locations/${id}`, requestOptions).then(handleResponse);
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

export const locationsService = {
    getById
};