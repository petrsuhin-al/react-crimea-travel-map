import { apiPrefix } from '../../etc/config.json';
import authHeader from "../helpers/auth-header";
import axios from "axios";

const getAllCities = () => {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${apiPrefix}/cities`, requestOptions).then(handleResponse);
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

export const citiesService = {
    getAllCities
};