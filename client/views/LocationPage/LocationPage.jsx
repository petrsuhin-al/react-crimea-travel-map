import React from "react"
import PropTypes from "prop-types";
import {compose} from "recompose";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import locationPageStyles from "./LocationPage.jss";

class LocationPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(citiesActions.getAllCities());
    }

    render() {
        const {classes, cities} = this.props;

        return (
            <div className={classes.pageWrapper}>
                {
                    (cities.items)
                        ? <CityCarousel cities={cities.items}/>
                        : null
                }
            </div>
        );
    }
}

LocationPage.PropTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps  = (state) => {
    const { cities } = state;
    return { cities };
};

export default compose(
    withStyles(locationPageStyles, {withTheme: true}),
    connect(mapStateToProps)
)(LocationPage);