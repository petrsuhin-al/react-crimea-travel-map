const selectorsStyles = theme => ({
    selectorsWrap: {
        bottom: 0,
        left: 0,
        width: 35,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        ZIndex: 1
    },

    selector: {
        background: theme.palette.primary.main,
        width: 1,
        height: 80,
        margin: '5px 0',
        opacity: 0.5,
        cursor: 'pointer',
        transition: 'height .5s ease-in-out, opacity .5s ease-in-out'
    },

    activeSelector: {
        opacity: 0.9,
        height: 130
    }
});

export default selectorsStyles;