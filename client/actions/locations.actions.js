import locationsConstants from '../constants/locations.constants';
import { locationsService } from "../services/locations.service";

const getLocationById = (id) => {
    return dispatch => {
        dispatch(request());

        locationsService.getById(id)
            .then(
                location => dispatch(success(location)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: locationsConstants.GET_BY_ID_BEGIN } }
    function success(location) { return { type: locationsConstants.GET_BY_ID_SUCCESS, location } }
    function failure(error) { return { type: locationsConstants.GET_BY_ID_FAILURE, error } }
};

const locationsActions = { getLocationById };
export default locationsActions;