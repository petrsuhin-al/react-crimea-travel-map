import citiesConstants from '../constants/cities.constants';

const citiesReducer = (state = {}, action) => {
    switch (action.type) {
        case citiesConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };

        case citiesConstants.GET_ALL_SUCCESS:
            return {
                items: action.cities
            };

        case citiesConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
};

export default citiesReducer;