import React from "react";
import {Grid, Typography, withStyles, Button} from "@material-ui/core";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {connect} from "react-redux";
import rightUserMenuStyles from "./RightUserMenu.jss";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import {Animated} from "react-animated-css";
import classNames from "classnames";

class RightUserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { classes, user, loggedIn } = this.props;

        return (
            <div className={classes.menuWrapper}>
                <div className={classes.avatarContainer}>
                    <UserAvatar user={user} loggedIn={loggedIn} />
                </div>
                <div className={classes.usernameContainer}>
                    <Typography variant="h1" noWrap style={{fontSize: '1.4em', fontWeight: 700}}>
                        {/*{user.name}*/}
                        Alexander Petrushin
                    </Typography>
                    <Typography variant="h2" noWrap style={{fontSize: '1em',  paddingTop: 2}}>
                        @{user.username}
                    </Typography>
                </div>
                <div className={classes.changeTaskContainer}>
                    <Grid justify="space-between"
                          direction="row"
                          alignItems="center"
                          container spacing={1}
                    >
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained"
                                    size="large"
                                    classes={{
                                        root: classNames(classes.changeTaskButton, classes.floatRight)
                                    }}>
                                Large
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained"
                                    size="large"
                                    classes={{
                                        root: classNames(classes.changeTaskButton, classes.floatLeft)
                                    }}>
                                Large
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

RightUserMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { authentication } = state;
    const { user, loggedIn } = authentication;
    return { user, loggedIn };
};

export default compose(
    withStyles(rightUserMenuStyles, {withTheme: true}),
    connect(mapStateToProps),
)(RightUserMenu);