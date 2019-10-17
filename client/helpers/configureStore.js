import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers/RootReducers';
import history from "./history"

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                thunk
            ),
        ),
    );

    if (module.hot) {
        module.hot.accept('../reducers/RootReducers', () => {
            store.replaceReducer(createRootReducer(history));
        });
    }

    return store
}