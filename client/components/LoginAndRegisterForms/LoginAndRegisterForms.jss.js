import {fade} from "@material-ui/core/styles/colorManipulator";

const loginAndRegisterFormsStyles = theme => ({
    // контейнер
    loginContainer: {
        textAlign: 'center'
    },

    // заголовок
    goalTitle: {
        //margin: 0,
        fontSize: 70,
        fontWeight: 800,
        color: theme.palette.secondary.light,
        cursor: 'default',
        margin: '10% 0 0'
    },

    // "или" и "забвли пароль?"
    subtitle: {
        opacity: 0.8,
        fontSize: 19,
        cursor: 'default',
    },

    subtitleForgotPass: {
        borderBottom: '1px solid #facfb8',
        opacity: 0.8,
        fontSize: 19,
        transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
            opacity: 1
        }
    },

    // форма
    form: {
        margin: 0
    },

    // текстовые поля
    textField: {
        display: 'flex',
        margin: 10,
        background: 'rgba(250, 187, 152, 0.1)',
    },

    tfLabelRoot: {
        color: 'rgba(0, 0, 0, 0.5)',
        '&$tfFocused': {
            color: 'rgba(0, 0, 0, 0.6)'
        }
    },

    tfInputRoot: {
        border: 'none',

        '&$tfFocused $tfNotchedOutline': {
            border: 'none !important'
        }
    },

    tfFocused: {},

    tfNotchedOutline: {
        border: 'none'
    },

    // блок с текстом о забытии пароля
    forgotPasswordTitleWrap: {
        margin: '10% 35% 6%',
        transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            margin: '10% 32% 6%'
        }
    },

    // кнока ВХОД
    signInFabRoot: {
        boxShadow: 'none',
        width: 200,
        height: 57,
        backgroundColor: fade(theme.palette.secondary.light, 0.7),
        '&:hover': {
            backgroundColor: fade(theme.palette.secondary.light, 0.9),
            boxShadow: 'none'
        },
    },

    signInFabRootIfRegister: {
        marginTop: 10
    },

    signInFabLabel: {
        fontSize: 20,
        color: 'rgba(250, 251, 253, 0.9)'
    }
});

export default loginAndRegisterFormsStyles;