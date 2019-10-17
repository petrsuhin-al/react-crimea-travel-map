import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import RootRoutes from './routes/RootRoutes';
import AppBar from './containers/AppBar/AppBar';
import theme from "./helpers/mui-theme";
import {MuiThemeProvider} from "@material-ui/core";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

class App extends React.Component {
    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 2000))
    }

    componentWillMount(){
        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator')
            if(ele){
                // fade out
                ele.classList.add('available');
                setTimeout(() => {
                    // remove from DOM
                    ele.outerHTML = ''
                }, 2000)
            }
        })
    }

    render(){
        return (
            <ErrorBoundary>
                <MuiThemeProvider theme={theme}>
                    <ConnectedRouter history={this.props.history}>
                        <div id="App">
                            <AppBar />
                            <RootRoutes />
                        </div>
                    </ConnectedRouter>
                </MuiThemeProvider>
            </ErrorBoundary>
        )
    }
}
// const App = ({ history }) => {
//     return (
//         <ErrorBoundary>
//         <MuiThemeProvider theme={theme}>
//             <ConnectedRouter history={history}>
//                 <div id="App">
//                     <AppBar />
//                     <RootRoutes />
//                 </div>
//             </ConnectedRouter>
//         </MuiThemeProvider>
//         </ErrorBoundary>
//     )
// };

App.propTypes = {
    history: PropTypes.object,
};

export default App;