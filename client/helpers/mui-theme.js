import {createMuiTheme} from "@material-ui/core";

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff',
            light: '#4bbdd8'
        },
        secondary: {
            main: '#95a0a9',
            light: '#fabb98'
        },
    },
    typography: {
        fontFamily: `'PT Sans Narrow', sans-serif`
    },
});

export default muiTheme;