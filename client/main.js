import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './helpers/configureStore';
import history from './helpers/history';
import "./helpers/fontawesome"

const store = configureStore();

const renderApp = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById('Root')
    )
};

renderApp();

if (module.hot) {
    module.hot.accept('./App', () => renderApp())
}