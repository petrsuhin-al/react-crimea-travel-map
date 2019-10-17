import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";
import { Link as RouterLink } from 'react-router-dom';
import userActions from "../../actions/user.actions";
import {withStyles} from "@material-ui/core";
import LoginForm from "../../components/LoginAndRegisterForms/LoginForm";
import RegisterForm from "../../components/LoginAndRegisterForms/RegisterForm";

class LoginAndRegistrationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            submitted: false,
            showPassword: false,
        };

        this.baseState = this.state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTextField = this.handleChangeTextField.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    }

    componentDidUpdate(prevProps, nextProps, prevState) {
        if(prevProps.formType !== this.props.formType) this.setState(this.baseState)
    }

    handleChangeTextField = prop => event => {
        this.setState({
            [prop]: event.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            submitted: true
        });
        const { email, username, password } = this.state;
        const { formType } = this.props;

        if (formType === "login" && username && password) {
            this.props.dispatch(userActions.login(username, password));
            this.props.toggleDrawer('loginDrawer', false);
        }
        if (formType === "register" && username && password && email) {
            const registeredUser = {
                email,
                username,
                password
            };
            this.props.dispatch(userActions.register(registeredUser));
            this.props.toggleDrawer('loginDrawer', false);
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({
            showPassword: !state.showPassword
        }));
    };

    render() {
        const { loggingIn, formType } = this.props;
        const { email, username, password, submitted, showPassword } = this.state;

        if(formType === "login") return  <LoginForm handleSubmit={this.handleSubmit}
                                                    handleChange={this.handleChangeTextField}
                                                    handleClickShowPassword={this.handleClickShowPassword}
                                                    showPassword={showPassword}
                                                    username={username}
                                                    submitted={submitted}
                                                    password={password}
        />;

        if(formType === "register") return <RegisterForm handleSubmit={this.handleSubmit}
                                                         handleChange={this.handleChangeTextField}
                                                         handleClickShowPassword={this.handleClickShowPassword}
                                                         showPassword={showPassword}
                                                         username={username}
                                                         email={email}
                                                         submitted={submitted}
                                                         password={password}
        />
    }
}

LoginAndRegistrationContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    loggingIn: PropTypes.bool,
    registering: PropTypes.bool,
    formType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    const { loggingIn, registering } = state.authentication;
    return { loggingIn, registering };
};

export default connect(mapStateToProps)(LoginAndRegistrationContainer);

