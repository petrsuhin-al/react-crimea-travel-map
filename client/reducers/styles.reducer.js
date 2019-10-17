//import styleConstants from '../constants/style.constants';

const initialState = {
        name: 'styleNormal'
};

const styleReducer = (state = {}, action) => {
    switch (action.type) {
        case "changeStyleNormal":
            return {
                ...state,
                name: action.style,
            };

        case "changeStyleNew":
            return {
                ...state,
                name: action.style,
            };

        default:
            return state
    }
};

export default styleReducer;