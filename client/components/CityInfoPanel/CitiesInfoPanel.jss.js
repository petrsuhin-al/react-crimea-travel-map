import {fade} from "@material-ui/core/styles/colorManipulator";

const citiesInfoPanelStyles = theme => ({
    // сама панель
    citiesMainPanel: {
        height: 280,
        color: theme.palette.primary.main,
        transform: 'scale(0.5)',
        transformOrigin: 'center left',
        transition: 'opacity 450ms linear, transform 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'
    },

    // активное имя города
    activeCityName: {
        margin: 0,
        opacity: 0.9,
        fontWeight: 600,
        fontSize: 100,
        textTransform: 'capitalize',
        cursor: 'default',
        position: 'fixed'
    },

    // неактивное имя города
    nonActiveCityName: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        margin: 0,
        cursor: 'pointer',
        fontSize: 100,
        fontWeight: 600,
        textTransform: 'capitalize',

        backgroundImage: 'linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,0.53) 37%, rgba(237,237,237,0) 80%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        textFillColor: 'transparent',
        transition: 'background-color 300ms linear',
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.25),
        },
    },

    // контейнер с информацией о городе
    cityInfo: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },

    // описание города и текста кнопки
    cityDescAndButton: {
        margin: 0,
        opacity: 0.9,
        fontSize: 18,
        lineHeight: '1.8em'
    },

    // кнопка
    exploreButton: {
        padding: '12px 10px',
        marginTop: 30,
        width: 160,
        textTransform: 'capitalize',
        color: theme.palette.primary.main,
        boxShadow: 'none'
    },

    // иконка в кнопке
    rightIcon: {
        fontSize: 15,
        marginLeft: 23,
        marginTop: 5,
    }
});

export default citiesInfoPanelStyles;