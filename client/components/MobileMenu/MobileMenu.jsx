import React from "react";
import PropTypes from "prop-types";
import mobileMenuStyles from "./MobileMenu.jss";
import {Menu, MenuItem, withStyles} from "@material-ui/core";

const MobileMenu = ({ classes, anchorEl, isOpen, mobileMenuClose }) => (
    <Menu anchorEl={anchorEl}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          open={isOpen}
          onClose={mobileMenuClose}
    >
        <MenuItem>
            <p>Notifications</p>
        </MenuItem>
        {/*<MenuItem onClick={this.handleProfileMenuOpen}>*/}
            {/*<p>Profile</p>*/}
        {/*</MenuItem>*/}
    </Menu>
);

MobileMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(mobileMenuStyles, {withTheme: true})(MobileMenu);