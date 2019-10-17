import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";
import Selectors from "../../components/Selectors/Selectors"
import cityCarouselStyles from "./CityCarousel.jss";
import CitiesInfoPanel from "../../components/CityInfoPanel/CitiesInfoPanel";
import LocationsCarousel from "../LocationsCarousel/LocationsCarousel";

class CityCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeID: 0,
            citiesLocations: [],
            onMountAnimationDelay: 1500,
            citiesCarouselVisible: true,
            wrapperBackgroundImage: {
                backgroundImage: ''
                //backgroundImage: `url('${this.props.cities[0].img}')`
            }
        };
    }

    componentWillMount(){
        this.props.cities.forEach(city => {
            console.log("LOADING IMG");
            const img = new Image();
            img.src = city.img;
            console.log(img);
        });
        this.setState({
            wrapperBackgroundImage: {
                backgroundImage: `url('${this.props.cities[this.state.activeID].img}')`
            }
        });
        this.props.cities.map(city =>  // пушим все локации всех городов в массив из стейтов
            this.state.citiesLocations.push(city.locations)
        );
        this.state.citiesLocations.map(location => // добавляем в начало последний объект локации в каждом списке локаций
            location.unshift(location[location.length - 1])
        );
        this.state.citiesLocations.map(location => // удаляем последний объект
            location.splice(location.length - 1, 1)
        )

    } // на выходе получаем массивы локаций с измененным порядком - последний элемень стал первым


    /**
     * Переключает город с очередью turnId, меняет фоновое изображение и возвращает начальный порядок локаций.
     *
     * @param {number} turnId Порядковая очередь города
     * @return {state} Состояние с новым городом
     */
    _changeActive = (turnId) => { // функция изменения бэкграунда и города
        this.setState({
            activeID: turnId,
            activeLocation: 0,
            wrapperBackgroundImage: {
                backgroundImage: `url('${this.props.cities[turnId].img}')`
            },
        })
    };

    render() {
        const { classes, cities } = this.props;
        const { activeID, wrapperBackgroundImage, onMountAnimationDelay, citiesCarouselVisible, citiesLocations } = this.state;

        const citiesPanelTranslateY = {
            transform: `translate3D(0, -${cities[activeID].turnId*(100/cities.length)}%, 0)`
        };

        return (
            <section className={classes.mainWrapper}>
                <div className={classes.background} style={wrapperBackgroundImage}/>
                <Grid justify="space-between"
                      direction="row"
                      alignItems="center"
                      container spacing={24}
                      className={classes.margin}
                >
                    <Grid item xs={1} md={1}>
                        <Animated animationIn="bounceInLeft"
                                  animationOut="bounceOutLeft"
                                  isVisible={citiesCarouselVisible}
                                  animationInDelay={onMountAnimationDelay}
                        >
                        <Selectors data={cities}
                                   activeID={activeID}
                                   _changeActive={this._changeActive}
                        />

                        </Animated>
                    </Grid>
                    <Grid item xs={11} md={4}>
                        <Animated animationIn="bounceInLeft"
                                  animationOut="bounceOutLeft"
                                  isVisible={citiesCarouselVisible}
                                  animationInDelay={onMountAnimationDelay}
                        >
                        <div className={classes.cityCarousel}>
                            <div className={classes.carouselWrapper} style={citiesPanelTranslateY}>
                                {
                                    cities.map(city =>
                                        <CitiesInfoPanel _changeActive={this._changeActive}
                                                        activeID={activeID}
                                                        key={city._id}
                                                        city={city}
                                        />)
                                }
                            </div>
                        </div>
                        </Animated>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <LocationsCarousel city={activeID}
                                           locations={citiesLocations[activeID]}
                        />
                    </Grid>
                </Grid>
            </section>
        );
    }
}

CityCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(cityCarouselStyles, {withTheme: true})(CityCarousel);