import {fade} from "@material-ui/core/styles/colorManipulator";

const locationStyles = theme => ({
    cardWrapper: {
        width: 315,
        height: 500,
        color: theme.palette.primary.main,
        transformOrigin: 'center left',
        transition: 'opacity 450ms linear, transform 1500ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'
    },
    title: {
        margin: 0,
        opacity: 0.9,
        fontSize: 20,
        fontWeight: 'inherit',
        lineHeight: '1.8em',
    },
    ratingWrap: {
        marginBottom: 5
    },
    locationCard: {
        width: '100%',
        height: 450,
        cursor: 'pointer',
        backgroundSize: 'cover',
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.9)
        },
    },
    favoriteIcon: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        margin: theme.spacing.unit,
        opacity: 0.9,
        boxShadow: 'none',
        '&:hover': {
            opacity: 1,
            backgroundColor: fade(theme.palette.primary.main, 0.9)
        },
    }
});

export default locationStyles;