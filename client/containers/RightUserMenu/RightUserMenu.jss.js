import {fade} from "@material-ui/core/styles/colorManipulator";

const rightUserMenuStyles = theme => ({
    menuWrapper: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        padding: '40px 0',
        background: "#fff",
        borderRadius: 20,
        boxShadow: '0px 0px 10px -6px rgba(92,92,92,1)'
    },

    avatarContainer: {
        width: '120px',
        height: '120px',
        display: 'inline-flex',
        position: 'relative',
        alignItems: 'center'
    },

    usernameContainer: {
        padding: 5
    },

    changeTaskContainer: {
        padding: '0 20px'
    },

    changeTaskButton: {
        padding: 24,
        margin: 10,
        backgroundColor: 'rgba(239, 207, 108, 0.7)',
        '&:hover': {
            backgroundColor: fade('#efcf6c', 0.8)
        },
        '&:active': {
            backgroundColor: 'rgba(239, 207, 108, 0.9)',
        },
    },

    floatLeft: {
        float: 'left'
    },

    floatRight: {
        float: 'right'
    }
});

export default rightUserMenuStyles;