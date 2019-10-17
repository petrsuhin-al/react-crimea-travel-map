import userConstants from '../constants/user.constants';

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };

        case userConstants.GET_ALL_SUCCESS:
            return {
                items: action.users
            };

        case userConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };

        case userConstants.DELETE_REQUEST:
            // добавляем свойство 'deleted: true'
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };

        case userConstants.DELETE_SUCCESS:
            // убираем юзера из состояния
            return {
                items: state.items.filter(user => user.id !== action.id)
            };

        case userConstants.DELETE_FAILURE:
            // убираем 'deleting:true' и добавляем 'deleteError:[error]'
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // делаем копию юзера без 'deleting:true'
                        const { deleting, ...userCopy } = user;
                        // возвращаем сделанную копию с свойством 'deleteError:[error]'
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };


        default:
            return state
    }
};

export default usersReducer;