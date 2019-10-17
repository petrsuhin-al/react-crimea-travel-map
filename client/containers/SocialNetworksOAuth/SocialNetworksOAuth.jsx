import React from "react";
import {compose} from "recompose";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import socialNetworksOAuthStyles from "./SocialNetworksOAuth.jss";
import userActions from "../../actions/user.actions";
import FabWithBrand from "../../components/FabWithBrand/FabWithBrand";

class SocialNetworksOAuth extends React.Component {
    constructor(props){
        super(props);
        this.state={
            socialIcons: {
                'vk': 'vk',
                'facebook': 'facebook-f',
                'ok': 'odnoklassniki',
                'instagram': "instagram"
            }
        };
    }

    handleSocialNetworksAuth = (snVariant) =>
        this.props.dispatch(userActions.socialNetworkLogin(snVariant));


    render() {
        const { classes } = this.props;
        const { socialIcons } = this.state;

        return (
            <div className={classes.socialFabsContainer}>
                {
                    Object.keys(socialIcons).map(key => (
                        <FabWithBrand icon={socialIcons[key]}
                                      link={key}
                                      handleAuth={this.handleSocialNetworksAuth}
                        />
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { loggingIn } = state.authentication;
    return { loggingIn };
};

SocialNetworksOAuth.propTypes = {
    classes: PropTypes.object.isRequired,
    loggingIn: PropTypes.bool.isRequired
};

export default compose(
    withStyles(socialNetworksOAuthStyles, {withTheme: true}),
    connect(mapStateToProps),
)(SocialNetworksOAuth);