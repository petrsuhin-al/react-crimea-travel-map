const auto = 'auto';
const reusableDrawerStyles = theme => ({
    // классы дравера
    drawerRoot: {
        touchAction: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    drawerPaper: {
        background: '#f6f6f6',
        width: '85%',
        height: '85%',
        borderRadius: 25,
        left: auto,
        right: auto,
        top: auto,
        overflow: 'hidden'
    },

    closeDrawerButtonRoot: {
        position: 'fixed',
        width: 30,
        height: '100%',
        minWidth: 25,
        color: theme.palette.primary.main,
        borderRadius: 0,
        boxShadow: 'none',
        zIndex: 3,
        background: 'transparent',
        transition: 'background 200ms linear',
        willChange: 'background',
        pointerEvents: 'all',
        '&:hover': {
            background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%)'
        },
        '&:active': {
            boxShadow: 'none'
        }
    },

    // классы кнопки закрытия дравера
    closeSearchDrawerButtonRoot: {
        right: 0,
        '&:hover': {
            background: 'linear-gradient(to left, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%)'
        },
    },

    closeDrawerButtonLabel: {
        background: 'rgba(56,55,55,0.5)',
        borderRadius: '50%',
        width: 'auto'
    },

    // классы брэнда сервиса
    titleWrapper: {
        padding: '35px 0 20px 35px',
        position: 'absolute'
    },

    // контейнер всего контента дравера
    contentContainer: {
        width: '100%',
        height:  '100%',
        overflow: 'hidden'
    },

    // классы для свичера и логина/регистрации
    formsWrappers: {
        position: 'absolute',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        willChange: 'left, background-position, width',
        pointerEvents: 'all'
    },

    // класс логина/регистрации
    loginOrRegisterWrapper: {
        width: '55%',
        transition: 'left 1000ms ease-in-out',
        zIndex: 1,
    },

    // класс формы с картинкой
    changeGoalWrapper: {
        backgroundImage: 'url(https://res.cloudinary.com/tripsbank-crimea/image/upload/v1552829114/app-files/service-images/more-3840x2160-4k-hd-solnce-zakat-kamni-priroda-5191.jpg)',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transition: 'left 1000ms ease-in-out, background-position 1000ms ease-in-out, width 400ms ease-in-out',
        zIndex: 2,
        overflow: 'hidden'
    },

    // класс контейнера логина/регистрации
    loginFormContainer: {
        width: '65%'
    },

    // класс контейнера с картинкой
    switchContainer: {
        width: 500,
        textAlign: 'center',
        position: 'relative'
    },

    // контент формы с картинкой
    switchContent: {
        transition: 'transform 600ms ease-in-out',
        willChange: 'transform',
        pointerEvents: 'all',
        bottom: 0,
        textAlign: 'center',
        position: 'absolute'
    },

    switchTitle: {
        margin: 0,
        opacity: 0.8,
        fontSize: 70,
        fontWeight: 800,
        color: theme.palette.primary.main,
        cursor: 'default',
    },

    switchSubtitle: {
        marginTop: 30,
        opacity: 0.8,
        fontSize: 23,
        color: theme.palette.primary.main,
        cursor: 'default',
    },

    // кнопка смена задачи на регистрацию или логина
    changeGoalButtonRoot: {
        padding: '10px 60px',
        transition: 'width 400ms ease-in-out',
        willChange: 'width',
        borderRadius: 25,
        position: 'absolute',
        left: '50%',
        marginRight: '-50%',
        top: 0,
        transform: 'translate(-50%, -50%)'
    },

    titlesContainer: {
        width: '95%',
        height: '50%',
        position: 'relative',
        margin: 'auto',
    },

    buttonContainer: {
        width: '100%',
        height: '35%',
        position: 'relative'
    },

    changeGoalButtonLabel: {
        fontSize: 20
    }
});

export default reusableDrawerStyles;