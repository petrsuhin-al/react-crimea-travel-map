import React from "react";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Menu, MenuItem, withStyles, Typography, ListItemIcon, Divider} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import userActions from "../../actions/user.actions"
import userMenuStyles from "./UserMenu.jss";


class UserMenu extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout =  this.handleLogout.bind(this);
    }

    /**
     * Выход пользователя из системы
     *
     * @param {event} e Синтетическое событие.
     * @return {store} Удаляет из редукс стора пользователя и возвращает стор с изменениями
     */
    handleLogout = () => e => this.props.dispatch(userActions.logout());

    render() {
        const {classes, anchorEl, isOpen, userMenuClose, authentication}  = this.props;
        //const {username} = authentication.user;
        return (
            <Menu anchorEl={anchorEl}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                  transformOrigin={{vertical: 'top', horizontal: 'center'}}
                  getContentAnchorEl={null}
                  open={isOpen}
                  onClose={userMenuClose}
                  classes={{
                      paper: classes.listPaper
                  }}
            >
                <Link to="/" className={classes.menuLink}>
                    <MenuItem onClick={userMenuClose}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={["fas", "home"]}/>
                        </ListItemIcon>
                        <Typography variant="inherit">
                            Главная
                        </Typography>
                    </MenuItem>
                </Link>
                <Link to={"/"} className={classes.menuLink}>
                    <MenuItem onClick={userMenuClose}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={["fas", "user-alt"]}/>
                        </ListItemIcon>
                        <Typography variant="inherit">
                            Профиль
                        </Typography>
                </MenuItem>
                </Link>
                <Link to="/" className={classes.menuLink}>
                    <MenuItem onClick={userMenuClose}>
                        <ListItemIcon>
                            <FontAwesomeIcon icon={["fas", "newspaper"]}/>
                        </ListItemIcon>
                        <Typography variant="inherit">
                            Новости
                        </Typography>
                    </MenuItem>
                </Link>
                <Divider />
                <Link to="/" onClick={this.handleLogout()} className={classes.menuLink}>
                <MenuItem onClick={userMenuClose}>
                    <ListItemIcon>
                        <FontAwesomeIcon icon={["fas", "sign-out-alt"]}/>
                    </ListItemIcon>
                    <Typography variant="inherit">
                        Выход
                    </Typography>
                </MenuItem>
                </Link>
            </Menu>
        )
    }
}

const mapStateToProps = (state) => {
    const { authentication } = state;
    return { authentication };
};

UserMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    userMenuClose: PropTypes.func.isRequired
};

export default compose(
    withStyles(userMenuStyles, {withTheme: true}),
    connect(mapStateToProps)
)(UserMenu);