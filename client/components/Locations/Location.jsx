import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import locationStyles from "./Location.jss";
import RatingIcon from "@material-ui/icons/FiberManualRecordRounded";
import { IconButton, Card, CardHeader } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReactStars from "react-stars";

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
        };
    }

    // componentWillUpdate(prevProps, nextProps, nextState) {
    //     // if (this.props.location !== prevProps.location) {
    //     //     setTimeout(() =>
    //     //     this.setState({ // на всякий случай делаем задержку в одну секунду для смены локаций, чтоб наша карусель успела улететь
    //     //         location: this.props.location
    //     //     }), 1000)
    //     // }
    // }

    render() {
        const { classes } = this.props;
        const { location } = this.state;

        const backgroundImage = { // фон карточки локации
            backgroundImage: `url("${location.mainImage}")`
        };

        const ratingSet = { // стили и настройки точек рейтинга
            size: 5,
            count: 5,
            value: location.rating,
            edit: false,
            half: false,
            char: <RatingIcon style={{width: '0.7em', height: '0.7em'}} />,
            color1: 'rgba(255, 255, 255, 0.5)',
            color2: 'rgba(255, 255, 255, 0.9)'
        };

        return (
            <div className={classes.cardWrapper}>
                <h1 className={classes.title}>{location.name}</h1>
                <div className={classes.ratingWrap}>
                    <ReactStars {...ratingSet} />
                </div>
                <Card className={classes.locationCard} style={backgroundImage}>
                    <CardHeader
                        action = {
                            <IconButton aria-label="Add to favorites" className={classes.favoriteIcon}>
                                <FavoriteIcon />
                            </IconButton>
                        }
                    />
                </Card>
            </div>
        );
    }
}

Location.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(locationStyles, {withTheme: true})(Location);