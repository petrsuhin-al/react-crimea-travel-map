const cityCarouselStyles = theme => ({
    mainWrapper: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        overflowX: 'hidden',
        [theme.breakpoints.up('md')]: {
            overflowY: 'hidden'
        },
    },

    background: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        transition: 'background-image 500ms ease-in-out',
        filter: 'brightness(.8)'
    },

    carouselWrapper: {
        position: 'absolute',
        transition: 'transform 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        width: '100%'
    },

    cityCarousel: {
        position: 'relative',
        bottom: 100
    },

    locationList: {
        position: 'relative',
        marginLeft: 20,
        bottom: 160
    },
    locationsListWrap: {
        height: '100%',
        position: 'absolute',
        display: 'flex',
        transition: 'transform 1000ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'
    }

});

export default cityCarouselStyles;