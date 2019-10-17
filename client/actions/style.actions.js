//import styleConstants from "../constants/cities.constants";

const CHANGE_STYLE_NORMAL = 'changeStyleNormal';
const CHANGE_STYLE_NEW = 'changeStyleNew';

export function changeStyleNormal(style){
    return dispatch => {
        dispatch(request());

        type: CHANGE_STYLE_NORMAL, style
    }
}

export function changeStyleNew(style){
    return {
        type: CHANGE_STYLE_NEW, style
    }
}