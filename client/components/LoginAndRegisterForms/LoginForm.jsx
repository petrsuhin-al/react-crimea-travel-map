import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Fab, IconButton, InputAdornment, TextField, Typography, withStyles} from "@material-ui/core";
import loginAndRegisterFormsStyles from "./LoginAndRegisterForms.jss";
import SocialNetworksOAuth from "../../containers/SocialNetworksOAuth/SocialNetworksOAuth";

const LoginForm = ({
    classes,
    handleSubmit,
    handleChange,
    handleClickShowPassword,
    showPassword,
    username,
    submitted,
    password
}) => (
    <div className={classes.loginContainer}>
        <Typography className={classes.goalTitle} variant="h1">
            Вход
        </Typography>

        <SocialNetworksOAuth/>

        <Typography className={classes.subtitle} variant="subtitle1">
            или
        </Typography>

        <form name="login-form" onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
                label="Имя пользователя"
                type="text"
                autoComplete="email"
                variant="outlined"
                value={username}
                error={submitted && !username}
                onChange={handleChange('username')}
                className={classes.textField}
                InputLabelProps={{
                    classes: {
                        root: classes.tfLabelRoot,
                        focused: classes.tfFocused,
                    },
                }}
                InputProps={{
                    classes: {
                        root: classes.tfInputRoot,
                        focused: classes.tfFocused,
                        notchedOutline: classes.tfNotchedOutline,
                    },
                }}
            />
            <TextField
                label="Пароль"
                variant="outlined"
                value={password}
                type={showPassword ? 'text' : 'password'}
                error={submitted && !password}
                onChange={handleChange('password')}
                autoComplete="current-password"
                className={classes.textField}
                InputLabelProps={{
                    classes: {
                        root: classes.tfLabelRoot,
                        focused: classes.tfFocused,
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="Toggle password visibility"
                                        onClick={handleClickShowPassword}
                            >
                                {
                                    showPassword
                                        ? <FontAwesomeIcon icon={["far", "eye"]} style={{width: '1em'}}/>
                                        : <FontAwesomeIcon icon={["far", "eye-slash"]}
                                                           style={{width: '1em'}}/>
                                }
                            </IconButton>
                        </InputAdornment>
                    ),
                    classes: {
                        root: classes.tfInputRoot,
                        focused: classes.tfFocused,
                        notchedOutline: classes.tfNotchedOutline,
                    },
                }}
            />
            <div className={classes.forgotPasswordTitleWrap}>
                <Typography className={classes.subtitleForgotPass} variant="subtitle1">
                    Забыли пароль?
                </Typography>
            </div>
            <Fab variant="extended"
                 aria-label="Вход"
                 className={classes.margin}
                 onClick={handleSubmit}
                 classes={{
                     root: classes.signInFabRoot,
                     label: classes.signInFabLabel
                 }}
            >
                Вход
            </Fab>
        </form>
    </div>
);

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginAndRegisterFormsStyles, {withTheme: true})(LoginForm);