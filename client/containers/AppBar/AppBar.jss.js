import {fade} from "@material-ui/core/styles/colorManipulator";

const appBarStyles = theme => ({
    // Общие
    appBar: {
        background: 'rgba(0,0,0,0)',
        boxShadow: 'none',
        top: 20,
    },
    toolBar: {
        padding: '0 35px'
    },
    grow: {
        flexGrow: 1,
    },

    // Фабы
    icon: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        margin: theme.spacing.unit,
        opacity: 0.7,
        boxShadow: 'none',
        '&:hover': {
            opacity: 0.8,
            backgroundColor: fade(theme.palette.primary.main, 0.9)
        },
    },

    // Секции
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        float: 'right',
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    // Фото юзера
    avatar: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'transparent',
        color: theme.palette.secondary.main,
    },

    // Ссылки
    linksContainer: {
        display: 'inline-flex'
    },
    linkWrap: {
        margin: '8px 20px',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    links: {
        opacity: 0.7,
        '&:hover': {
            opacity: 0.8,
        }
    },

    // Бургер-иконка меню
    mobileBurgerIcon: {
        width: 14,
        height: 14,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 330ms ease-out'
    },

    toggledMobileBurgerIcon: {
        transform: 'rotate(-45deg)'
    },

    lineMenu: {
        backgroundColor: '#8e8d8f',
        borderRadius: 4,
        width: '100%',
        height: 2
    },

    lineMenuHalf: {
        width: '50%',
    },

    lineMenuStart: {
        transition: 'transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57)',
        transformOrigin: 'right',
    },

    toggledLineMenuStart: {
        transform: 'rotate(-90deg) translateX(1px)',
    },

    lineMenuEnd: {
        alignSelf: 'flex-end',
        transition: 'transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57)',
        transformOrigin: 'left'
    },

    toggledLineMenuEnd: {
        transform: 'rotate(-90deg) translateX(-1px)'
    },


    // Пока не нужные стили
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
});

export default appBarStyles;