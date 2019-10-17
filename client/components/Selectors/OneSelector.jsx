import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import classNames from "classnames";
import selectorsStyles from "./Selectors.jss";

class OneSelector extends React.Component {
    render() {
        const { classes, activeID, turnId, _handleClick } = this.props;

        let componentClass = classes.selector;
        if (activeID === turnId) {  // добавляем активный класс к селектору
            componentClass = classNames(classes.selector, classes.activeSelector);
        }

        return (
            <div className={componentClass} onClick={_handleClick.bind(this)}/>
        );
    }
}

OneSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(selectorsStyles, {withTheme: true})(OneSelector);