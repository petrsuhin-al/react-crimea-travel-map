import citiesConstants from '../constants/cities.constants';
import { citiesService } from '../services/cities.service';
import { alertActions } from './alert.actions';
import history from '../helpers/history';


const getAllCities = () => {
    return dispatch => {
        dispatch(request());

        citiesService.getAllCities()
            .then(
                cities => dispatch(success(cities)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: citiesConstants.GET_ALL_REQUEST } }
    function success(cities) { return { type: citiesConstants.GET_ALL_SUCCESS, cities } }
    function failure(error) { return { type: citiesConstants.GET_ALL_FAILURE, error } }
};

const citiesActions = { getAllCities };
export default citiesActions;