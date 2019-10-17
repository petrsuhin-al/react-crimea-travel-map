import {fade} from "@material-ui/core/styles/colorManipulator";

const fabWithBrandStyles = theme => ({
    socialFabRoot: {
        border: '1px solid rgba(0,0,0,0.3)',
        margin: '0 10px',
        boxShadow: 'none',
        backgroundColor: 'transparent',

        '&:hover': {
            boxShadow: 'none',
            backgroundColor: fade('#c8c7c6', 0.2)
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'rgba(200, 199, 198, 0.1)',
        },
    },

    socialFabLabel: {
        fontSize: 'large'
    }
});

export default fabWithBrandStyles;