import userConstants from '../constants/user.constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
            };

        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                user: {}
            };


        // case userConstants.UPDATE_REQUEST:
        //     return {
        //         ...state,
        //         user: state.user.map(user =>
        //             user.id === action.id
        //                 ? { ...user, updating: true }
        //                 : { updating: false } // user
        //         ),
        //
        //     };
        //
        // case userConstants.UPDATE_SUCCESS:
        //     return {
        //         updating: true,
        //         user: action.user
        //     };
        //
        // case userConstants.UPDATE_FAILURE:
        //     return {
        //         updating: false
        //     };


        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                user: {}
            };

        default:
            return state
    }
};

export default authenticationReducer;