import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from 'antd/lib/icon';
import citiesInfoPanelStyles from "./CitiesInfoPanel.jss";
import Fade from "@material-ui/core/Fade";

class CitiesInfoPanel extends React.Component {
    _handleClick = () => {
        if (this.props.city.turnId !== this.props.activeID) { // если не равно то меняем id
            this.props._changeActive(this.props.city.turnId);
        }
    };

    render() {
        const { classes, city, activeID } = this.props;

        let buttonColor = {
            backgroundColor: city.color
        };

        const buttonAndDesc = (
            <div style={{position: 'absolute', bottom: 0}}>
                <Fade in={true} style={{ transitionDelay: '200ms'}}>
                    <p className={classes.cityDescAndButton}>
                        {city.description}
                    </p>
                </Fade>
                <Fade in={true} style={{ transitionDelay: '300ms'}}>
                    <Button variant="contained" className={classes.exploreButton} style={buttonColor}>
                        <p className={classes.cityDescAndButton}>
                            Исследовать
                        </p>
                        <Icon type="right" className={classes.rightIcon}/>
                    </Button>
                </Fade>
            </div>
        );

        let transformCityAside = (activeID !== city.turnId)
            ? (activeID === city.turnId + 1 || activeID === city.turnId - 1)
                ? {
                    opacity: 0.5,
                    transform: 'scale(0.6)'
                }
                : {
                    opacity: 0,
                    transform: 'scale(0.6)'
                }
            : {
                opacity: 0.9,
                transform: 'scale(1)'
            };


        let renderButtonAndDesc = (activeID === city.turnId)
            ? buttonAndDesc
            : null;

        return (
            <aside id={`city-${city.turnId}`}
                   className={classes.citiesMainPanel}
                   style={transformCityAside}>
                <div className={classes.cityInfo}>
                    <h1 className={
                            (activeID !== city.turnId)
                                ? classes.nonActiveCityName
                                : classes.activeCityName
                        }
                        onClick={this._handleClick}
                    >
                        {city.name}
                    </h1>
                    {renderButtonAndDesc}
                </div>
            </aside>
        );
    }
}

CitiesInfoPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(citiesInfoPanelStyles, {withTheme: true})(CitiesInfoPanel);