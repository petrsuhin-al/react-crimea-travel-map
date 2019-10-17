import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {compose} from "recompose";
import {connect} from "react-redux";
import homePageStyles from "./Home.jss";
import CityCarousel from "../../containers/CityCarousel/CityCarousel";
import citiesActions from "../../actions/cities.actions";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(citiesActions.getAllCities());
    }

    render() {
        const { classes, cities } = this.props;

        return (
            <div className={classes.home}>
                {
                    (cities.items)
                        ? <CityCarousel cities={cities.items} />
                        : null
                }
            </div>
        );
    };
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps  = (state) => {
    const { cities } = state;
    return { cities };
};

const connectedHomePage = compose(
    withStyles(homePageStyles, {withTheme: true}),
    connect(mapStateToProps)
)(HomePage);

export default connectedHomePage;