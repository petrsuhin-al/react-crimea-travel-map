import React from "react";
import {Link as RouterLink} from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Link, Typography, withStyles} from "@material-ui/core";
import brandStyles from "./Brand.jss";

const Brand = ({classes, variant}) => (
    <Link component={RouterLink} to="/">
        <img alt="service-logo"
             src={
                 (variant === "white")
                     ? 'https://res.cloudinary.com/tripsbank-crimea/image/upload/v1552401705/app-files/service-logo/white-logo.png'
                     : 'https://res.cloudinary.com/tripsbank-crimea/image/upload/v1552401705/app-files/service-logo/color-logo.png'
             }
             width="36"
             height="36"
             className={classes.logo}
        />
        <Typography className={classNames(classes.title, (variant === "white") ? classes.whiteTitle : classes.colourfulTitle)}
                    variant="h6"
                    noWrap
        >
            TRIPSBANK CRIMEA
        </Typography>
    </Link>
);

Brand.propTypes = {
    classes: PropTypes.object.isRequired,
    variant: PropTypes.string.isRequired
};

export default withStyles(brandStyles, {withTheme: true})(Brand);