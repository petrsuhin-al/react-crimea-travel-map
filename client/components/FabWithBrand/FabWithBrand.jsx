import React from "react";
import PropTypes from "prop-types";
import {Fab, withStyles} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fabWithBrandStyles from "./FabWithBrand.jss";

const FabWithBrand = ({classes, icon, handleAuth, link}) => (
    <Fab size="large"
         classes={{
             root: classes.socialFabRoot,
             label: classes.socialFabLabel
         }}
         onClick={handleAuth.bind(this, link)}
    >
        <FontAwesomeIcon icon={["fab", icon]}/>
    </Fab>
);

FabWithBrand.propTypes = {
    classes: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired
};

export default withStyles(fabWithBrandStyles, {withTheme: true})(FabWithBrand);