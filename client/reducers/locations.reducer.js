import locationsConstants from '../constants/locations.constants';

const locationReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case locationsConstants.GET_BY_ID_BEGIN:
            return {
                loading: true,
                items: []
            };

        case locationsConstants.GET_BY_ID_SUCCESS:
            return {
                items: [...state.items, action.location]
            };

        case locationsConstants.GET_BY_ID_FAILURE:
            return {
                error: action.error,
                items: []
            };

        default:
            return state;
    }
};

export default locationReducer;
