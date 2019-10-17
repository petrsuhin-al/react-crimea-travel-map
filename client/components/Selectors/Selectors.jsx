import React from "react";
import Selector from "./OneSelector";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import selectorsStyles from "./Selectors.jss";

class Selectors extends React.Component {
    _handleClick(e) {
        if (this.props.turnId !== this.props.activeID) { // если не равно то меняем id
            this.props._changeActive(this.props.turnId);
        }
    }
    render() {
        const { classes, _changeActive, activeID } = this.props;
        return (
            <div className={classes.selectorsWrap}>
                {
                    this.props.data.map((item) =>
                        <Selector key={item.turnId}
                                  turnId={item.turnId}
                                  _handleClick={this._handleClick}
                                  _changeActive={_changeActive}
                                  activeID={activeID}
                        />
                    )
                }
            </div>
        );
    }
}

Selectors.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(selectorsStyles, {withTheme: true})(Selectors);