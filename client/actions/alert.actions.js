import alertConstants from '../constants/alert.constants';

const success = (message) => ({ type: alertConstants.SUCCESS, message });
const error = (message) => ({ type: alertConstants.ERROR, message });
const clear = () => ({ type: alertConstants.CLEAR });

export const alertActions = { success, error, clear };