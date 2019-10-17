import React from "react";
import PropTypes from "prop-types";
import userAvatarStyles from "./UserAvatar.jss";
import { Avatar, withStyles } from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { pasteInString } from "../../helpers/useful-funcs";

const UserAvatar = ({ classes, user, loggedIn }) => (loggedIn)
    ? (user.profilePhoto)
        ? <Avatar alt={user.name} src={pasteInString(user.profilePhoto,56,0,"/q_10")} className={classes.avatar} />
        : <Avatar alt={user.name} className={classes.avatar}>
            {
                (user.name)
                    //? user.name.match(/\b(\w)/g).join('')
                    //: user.username.match(/\b(\w)/g).join('')
            }
          </Avatar>
    : <FontAwesomeIcon icon={["fas", "user-alt"]}/>;

UserAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired
};

export default withStyles(userAvatarStyles, {withTheme: true})(UserAvatar);