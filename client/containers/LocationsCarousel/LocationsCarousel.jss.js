import {fade} from "@material-ui/core/styles/colorManipulator";

const locationsCarouselStyles = theme => ({
    locationsCarousel: {
        padding: '100px 0 0 20px'
    },

    wrapper: {
        width: '100%'
    },

    carouselContainer: {
        display: 'flex',
        margin: '0 0 20px 10px'
    },

    carouselSlot: {
        flex: 1,
        marginRight: 10,
        transformOrigin: 'bottom right',
    },

    navigationPanel: {
        position: 'relative',
        padding: '20px 0 0 4px',
        color: theme.palette.primary.main,
    },


    nextAndPrevButtons: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: theme.palette.primary.main,
        margin: theme.spacing.unit,
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.3)
        },
        '&$disabledNextAndPrevButtons': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: theme.palette.primary.main,
        },
    },

    disabledNextAndPrevButtons: {},

    numOfLocationsContainer: {
        position: 'absolute',
        display: 'inline-block',
        margin: '0 50px 0 0',
        right: 0,
        bottom: 0
    },

    numOfLocations: {
        fontSize: 30,
        lineHeight: '1.8em',
        display: 'inline'
    },

    activeNum: {
        opacity: 1
    },

    generalNum: {
        opacity: 0.7
    },

    icon: {
        opacity: 0.8
    },

    line: {
        display: 'inline-block',
        borderTop: '2px solid white',
        width: 60,
        height: 10,
        margin: '0 15px',
        opacity: 0.7
    }
});

export default locationsCarouselStyles;