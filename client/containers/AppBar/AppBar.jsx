import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { compose } from 'recompose';
import appBarStyles from './AppBar.jss';
import { AppBar, Toolbar, Grid, Fab, Link, withStyles, Menu, MenuItem } from '@material-ui/core';
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import UserMenu from "../../components/UserMenu/UserMenu";
import {changeStyleNormal, changeStyleNew} from "../../actions/style.actions";
import ReusableDrawer from "../../components/ReusableDrawer/ReusableDrawer";
import {Animated} from "react-animated-css";
import Brand from "../../components/Brand/Brand";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import history from "../../helpers/history";

class PrimaryAppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileMoreAnchorEl: null, // якорь для открытия мобильного меню
            toggledBurgerIcon: null, // бургер иконка
            firstLineBurgerIcon: null, // линия бургер иконки
            secondLineBurgerIcon: null, // линия бургер иконки
            checked: true,
            loginDrawer: false,
            searchDrawer: false,
            userMenuAnchorEl: null,

            closeDrawers: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    handleMobileMenuOpen = event => { // функция открытия мобильного меню
        const { classes } = this.props;
        this.setState({
            mobileMoreAnchorEl: event.currentTarget,
            toggledBurgerIcon: classes.toggledMobileBurgerIcon,
            firstLineBurgerIcon: classes.toggledLineMenuStart,
            secondLineBurgerIcon: classes.toggledLineMenuEnd
        });
    };

    handleMobileMenuClose = () => {  // функция закрытия мобильного меню
        this.setState({
            mobileMoreAnchorEl: null,
            toggledBurgerIcon: null,
            firstLineBurgerIcon: null,
            secondLineBurgerIcon: null
        });
    };

    toggleDrawer = (drawer, open) => () => {
        this.setState({
            [drawer]: open,
        });
    };

    handleUserMenuOpen = event => {
        this.setState({
            userMenuAnchorEl: event.currentTarget
        })
    };

    handleUserMenuClose = () => {
        this.setState({
            userMenuAnchorEl: null
        });
    };

    render() {
        const {
            mobileMoreAnchorEl,
            toggledBurgerIcon,
            firstLineBurgerIcon,
            secondLineBurgerIcon,
            loginDrawer,
            searchDrawer,
            checked,
            userMenuAnchorEl,
            closeDrawer
        } = this.state;
        const { classes, user, loggedIn, loggingIn, location } = this.props;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const isUserMenuOpen = Boolean(userMenuAnchorEl);

        const loginSwipeDrawer = (!loggedIn)
            ? (
                <ReusableDrawer toggleDrawer={this.toggleDrawer}
                                drawerOpen={(loggedIn) ? false : loginDrawer}
                                type='loginDrawer'
                />
            )
            : null;

        return (
            <div id="headerRoot">
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <Grid justify="space-between"
                              direction="row"
                              alignItems="center"
                              container spacing={24}
                        >
                            {/* БРЭНД */}
                            <Grid item xs>
                                <Animated animationIn="bounceInLeft"
                                          animationOut="bounceOutLeft"
                                          isVisible={!(loginDrawer || searchDrawer)}
                                >
                                <Brand variant='white'/>
                                </Animated>
                            </Grid>

                            {/* ДЕСКТОП МЕНЮ */}
                            <Grid item xs={7}>
                                <div className={classes.sectionDesktop}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDelay={1500} isVisible={checked}>
                                        <div className={classes.linksContainer}>
                                            <Link className={classes.linkWrap} component={RouterLink} to="/">
                                                <p className={classes.links}>Блоги</p>
                                            </Link>
                                            <Link className={classes.linkWrap} component={RouterLink} to="/">
                                                <p className={classes.links}>Отмеченные</p>
                                            </Link>
                                            <Link className={classes.linkWrap} component={RouterLink} to="/">
                                                <p className={classes.links}>Путешествуй сейчас</p>
                                            </Link>
                                        </div>
                                    </Animated>

                                    {/*ИКОНКА ЮЗЕРА С МЕНЮШКОЙ*/}
                                    <div className={classes.grow}/>
                                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" animationInDelay={1000} isVisible={checked}>
                                        <Fab size="medium"
                                             aria-label="Search"
                                             className={classes.icon}
                                             onClick={this.toggleDrawer( 'searchDrawer', true)}
                                        >
                                            <FontAwesomeIcon icon={["fas", "search"]}/>
                                        </Fab>
                                    </Animated>
                                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" animationInDelay={500} isVisible={checked}>
                                        <Fab size="medium"
                                             aria-label="User"
                                             aria-haspopup="true"
                                             aria-owns={isUserMenuOpen ? 'user-menu' : undefined}
                                             onClick={
                                                 (!loggedIn)
                                                     ? this.toggleDrawer( 'loginDrawer', true)
                                                     : this.handleUserMenuOpen
                                             }
                                             className={classes.icon}
                                             style={{ opacity: (loggedIn && user.profilePhoto) ? 1 : 0.7 }}
                                        >
                                            <UserAvatar user={user} loggedIn={loggedIn} />
                                        </Fab>
                                    </Animated>
                                </div>
                            </Grid>
                        </Grid>

                        {/*/!* МОБИЛЬНОЕ МЕНЮ *!/*/}
                        <div className={classes.sectionMobile}>
                            <Fab
                                size="medium"
                                aria-label="Search"
                                className={classes.icon}
                                onClick={this.toggleDrawer( 'searchDrawer', true)}
                            >
                                <FontAwesomeIcon icon={["fas", "search"]}/>
                            </Fab>
                            <Fab
                                size="medium"
                                aria-label="Menu"
                                aria-owns={isMobileMenuOpen ? 'mobile-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                className={classes.icon}
                            >
                                <div className={classNames(toggledBurgerIcon, classes.mobileBurgerIcon)}>
                                    <div className={classNames(firstLineBurgerIcon, classes.lineMenu, classes.lineMenuHalf, classes.lineMenuStart)}/>
                                    <div className={classNames(classes.lineMenu)}/>
                                    <div className={classNames(secondLineBurgerIcon, classes.lineMenu, classes.lineMenuHalf, classes.lineMenuEnd)}/>
                                </div>
                            </Fab>
                        </div>
                    </Toolbar>
                </AppBar>

                <MobileMenu anchorEl={mobileMoreAnchorEl}
                            isOpen={isMobileMenuOpen}
                            mobileMenuClose={this.handleMobileMenuClose}
                />
                <UserMenu anchorEl={userMenuAnchorEl}
                          isOpen={isUserMenuOpen}
                          userMenuClose={this.handleUserMenuClose}
                />
                {/*<ReusableDrawer toggleDrawer={this.toggleDrawer}*/}
                {/*                drawerOpen={loginDrawer}*/}
                {/*                type='loginDrawer'*/}
                {/*/>*/}
                {loginSwipeDrawer}
                <ReusableDrawer toggleDrawer={this.toggleDrawer}
                                drawerOpen={searchDrawer}
                                type='searchDrawer'
                />
            </div>

        );
    }
}

PrimaryAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { authentication, router } = state;
    const { user, loggingIn, loggedIn } = authentication;
    const { location } = router;
    return { user, loggingIn, loggedIn, location };

};

const connectedAppBar = compose(
    withStyles(appBarStyles, {withTheme: true}),
    connect(mapStateToProps),
)(PrimaryAppBar);

export default connectedAppBar;
