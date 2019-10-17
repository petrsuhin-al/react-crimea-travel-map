import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import locationReducer from './locations.reducer';
import alertReducer from './alert.reducer';
import authenticationReducer from './authentication.reducer';
import registrationReducer from './registration.reducer';
import usersReducer from './users.reducer';
import citiesReducer from "./cities.reducer";
import styleReducer from "./styles.reducer";

const rootReducers = (history) => combineReducers({
    cities: citiesReducer,
    locations: locationReducer,
    alert: alertReducer,
    authentication: authenticationReducer,
    registration: registrationReducer,
    users: usersReducer,
    style: styleReducer,
    router: connectRouter(history)
});

export default rootReducers;
