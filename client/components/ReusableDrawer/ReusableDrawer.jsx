import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {SwipeableDrawer, withStyles, Button, Typography} from "@material-ui/core";
import {Animated} from "react-animated-css";
import loginAndRegisterDrawerStyles from "./ReusableDrawer.jss";
import LoginAndRegistrationContainer from "../../containers/LoginAndRegistrationContainer/LoginAndRegistrationContainer";
import Brand from "../Brand/Brand";
import {compose} from "recompose";
import {connect} from "react-redux";

class ReusableDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeGoal: false,
            changeWidth: false,
            buttonTitle: "Регистрация",
            changeForm: false,
        }
    }

    toggleChangeGoal = () => {
        this.setState({
            changeGoal: !this.state.changeGoal,
            changeWidth: true,
        });
        setTimeout(() => this.setState({
            buttonTitle: (this.state.changeGoal) ? "Вход" : "Регистрация"
        }), 300);
        setTimeout(() => this.setState({
            changeForm: !this.state.changeForm
        }), 450);
        setTimeout(() => this.setState({
            changeWidth: false,
        }), 500);
    };

    render() {
        const {changeGoal, changeWidth, buttonTitle, changeForm } = this.state;
        const {classes, toggleDrawer, drawerOpen, type, authentication} = this.props;

        const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
        const openDrawerCond = (type === 'loginDrawer' && authentication.loggedIn)  ? false : drawerOpen;

       // const openDrawerCond  = (type, loggedIn) => loggedIn ? toggleDrawer(type, false) : toggleDrawer(type, true);

        if(type === 'loginDrawer' && authentication.loggedIn){
            toggleDrawer(type, false)
        }

        let drawerProps = {
            anchor: (type === 'loginDrawer') ? 'right' : 'left',
            onOpen: toggleDrawer(type, true),
            onClose: toggleDrawer(type, false),
            open: drawerOpen,
            variant: "temporary",
            transitionDuration: 500,
            disableBackdropTransition: !iOS,
            disableDiscovery: iOS,
            classes: {
                root: classes.drawerRoot,
                paper: classes.drawerPaper
            }
        };

        const drawerBrand = (
            <Animated animationIn="bounceInLeft"
                      animationOut="bounceOutLeft"
                      isVisible={drawerOpen}
                      animationInDelay={100}
                      style={{zIndex: 4}}
            >
                <div className={classes.titleWrapper} onClick={toggleDrawer(type, false)}>
                    <Brand variant={(changeGoal) ? "white" : "colourful"}/>
                </div>
            </Animated>
        );

        const registrationTxt = (
            <div className={classes.switchContent}
                 style={{
                     transform: (changeGoal) ? 'translateX(105%)' : 'translateX(0)',
                     transitionDelay: (changeGoal) ? '0ms' : '400ms',
                 }}
            >
                <Typography className={classes.switchTitle} variant="h1">
                    Привет, Друг!
                </Typography>
                <Typography className={classes.switchSubtitle} variant="subtitle1">
                    Пройди быструю регистрацию и начни путешествовать с нами и нашим сообществом уже сейчас.
                </Typography>
            </div>
        );

        const loginTxt = (
            <div className={classes.switchContent}
                 style={{
                     transform: (changeGoal) ? 'translateX(0px)' : 'translateX(-105%)',
                     transitionDelay: (changeGoal) ? '400ms' : '0ms',
                 }}
            >
                <Typography className={classes.switchTitle} variant="h1">
                    С возвращением!
                </Typography>
                <Typography className={classes.switchSubtitle} variant="subtitle1">
                    Выполни вход и посмотри что мы для тебя подготовили. У нас еще куча трипов.
                </Typography>
            </div>
        );

        let contentContainerStyles  = {
            left: (changeGoal) ? '45%' : 0
        };

        let changeGoalWrapStyles = {
            left: (changeGoal) ? 0 : '55%',
            backgroundPosition: (changeGoal) ? 'left bottom' : 'right bottom',
            width: (changeWidth) ? '55%' : '45%'
        };

        let changeGoalButtonStyles = {
            width: (changeWidth) ? 300 : 200,
            pointerEvents: (changeWidth) ? 'none' : 'all'
        };

        return (type === 'loginDrawer')
            ? (
                <SwipeableDrawer {...drawerProps}>
                    {drawerBrand}
                    <div className={classes.contentContainer}>
                        <div className={classNames(classes.formsWrappers, classes.loginOrRegisterWrapper)}
                             style={contentContainerStyles}
                        >
                            <div className={classes.loginFormContainer}>
                                <LoginAndRegistrationContainer toggleDrawer={toggleDrawer} formType={(changeForm) ? "register" : "login"}/>
                            </div>
                        </div>
                        <div className={classNames(classes.formsWrappers, classes.changeGoalWrapper)}
                             style={changeGoalWrapStyles}
                        >
                            <div className={classes.titlesContainer}>
                                {registrationTxt}
                                {loginTxt}
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="outlined"
                                        color="primary"
                                        classes={{
                                            root: classes.changeGoalButtonRoot,
                                            label: classes.changeGoalButtonLabel
                                        }}
                                        onClick={this.toggleChangeGoal}
                                        style={changeGoalButtonStyles}
                                >
                                    <Animated animationIn="fadeIn"
                                              animationOut="fadeOut"
                                              isVisible={!changeWidth}
                                              animateOnMount={false}
                                              style={{
                                                  animationDuration: '500ms'
                                              }}
                                    >
                                        {buttonTitle}
                                    </Animated>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwipeableDrawer>
            ) : (
                <SwipeableDrawer {...drawerProps}>
                    {drawerBrand}
                </SwipeableDrawer>
            )
    }
}

ReusableDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    drawerOpen: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    const { authentication } = state;
    return { authentication };
};

export default compose(
    connect(mapStateToProps),
    withStyles(loginAndRegisterDrawerStyles, {withTheme: true})
)(ReusableDrawer);