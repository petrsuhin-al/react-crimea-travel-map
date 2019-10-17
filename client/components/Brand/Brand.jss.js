const brandStyles = theme => ({
    logo: {
        float: 'left',
        flexWrap: 'wrap',
    },

    title: {
        display: 'none',
        margin: '2px 0 0 5px',
        float: 'left',
        fontFamily: 'Staatliches',

        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    colourfulTitle: {
        color: theme.palette.primary.light
    },

    whiteTitle: {
        color: theme.palette.primary.main
    }
});

export default brandStyles;