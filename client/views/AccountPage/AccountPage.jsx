import React from "react";
import { connect } from 'react-redux';
import userActions from '../../actions/user.actions';
import accountPageStyles from "./AccountPage.jss";
import {compose} from "recompose";
import {Grid, withStyles} from "@material-ui/core";
import RightUserMenu from "../../containers/RightUserMenu/RightUserMenu";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: '',
            submitted: false,
        };
    }

    handleLogout = () => {
        return (e) => this.props.dispatch(userActions.logout());
    };

    render() {
        const { classes} = this.props;
        return (
            <section className={classes.accountPageRoot}>
                <div className={classes.imgBack}/>
                <div className={classes.gridWrapper}>
                <Grid justify="space-between"
                      direction="row"
                      alignItems="center"
                      container spacing={24}
                >
                    <Grid item md={3}>
                            <RightUserMenu/>
                    </Grid>
                    <Grid item md={10}>
                    </Grid>
                </Grid>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
};

export default compose(
    withStyles(accountPageStyles, {withTheme: true}),
    connect(mapStateToProps)
)(AccountPage);