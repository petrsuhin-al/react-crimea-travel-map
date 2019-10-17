import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, withStyles } from "@material-ui/core";
import LoginForm from "../../containers/LoginAndRegistrationContainer/LoginAndRegistrationContainer";
import userProfileMenuStyles from "./UserProfileMenu.jss";

const UserProfileMenu = ({ classes, loggedIn, anchorEl, isMenuOpen, handleMenuClose }) => {
    const menuSettings = {
        anchorEl: anchorEl,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
        open: isMenuOpen,
        onClose: handleMenuClose
    };

    return (loggedIn)
        ? (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            </Menu>
        )
        : (
            <Menu anchorEl={anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
            >
                <LoginForm />
            </Menu>
        );
};

UserProfileMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(userProfileMenuStyles, {withTheme: true})(UserProfileMenu);