import React from "react";
import {Fab, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Animated } from "react-animated-css";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import cityCarouselStyles from "./LocationsCarousel.jss";
import Location from "../../components/Locations/Location";

class LocationsCarousel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            position: 0,
            direction: 'next',
            sliding: false,
            updateLocSet: true,
            disableNavButtons: false,
            locations: this.props.locations,
            onMountAnimationDelay: 1500
        }
    }

    componentWillUpdate(prevProps, nextProps, nextState){
        if (this.props.city !== prevProps.city) { // при обновлении компонента
            this.setState({
                updateLocSet: false, // задвигаем наши локации
                onMountAnimationDelay: 0
            });
            setTimeout(() => {
                this.setState({
                    position: 0, // возвращаем порядок
                    locations: this.props.locations  // обновляем локации
                })
            }, 500);
            setTimeout(() => {
                this.setState({
                    updateLocSet: true // выдвигаем их обратно
                })
            }, 1400)
        }
    }

    getOrder (itemIndex) {  // функция для получения порядка
        const { position, locations } = this.state;
        const numItems = locations.length || 1;

        if (itemIndex - position < 0) {
            return numItems - Math.abs(itemIndex - position) // если условие выполнилось то берем по модулю и возвращаем последний элемент
        }
        return itemIndex - position
    }

    nextSlide = () => { // функция для слайда к следующей локации
        const { position, locations } = this.state;
        const numItems = locations.length || 1;

        this.doSliding('next', position === numItems - 1 ? 0 : position + 1)
    };

    prevSlide = () => { // функция для слайда к предыдущей локации
        const { position, locations} = this.state;
        const numItems = locations.length;

        this.doSliding('prev', position === 0 ? numItems - 1 : position - 1)
    };

    doSliding = (direction, position) => {  // функция слайдинга
        this.setState({ // обновляем состояние - отключаем кнопки и листаем
            sliding: true,
            disableNavButtons: true,
            position,
            direction
        });
        setTimeout(() => { // поменяли очередь и сразу выключаем слайд, по сути пролистывания, как такового нет
            this.setState({
                sliding: false
            })
        }, 50);
        setTimeout(() => { // включем кнопки как анимация закончилась
            this.setState({
                disableNavButtons: false
            })
        }, 500)
    };

    render() {
        const { classes } = this.props;
        const { position, sliding, direction, updateLocSet, locations, onMountAnimationDelay, disableNavButtons } = this.state;

        const transformStyle = (sliding, direction, styleObj={}) => {
            if (!sliding) styleObj.transform = 'translateX(-324px)';  // трансформ стили
            else if (direction === 'prev') styleObj.transform = 'translateX(calc(2 * (-324px)))';
            else styleObj.transform = 'translateX(0px)';

            styleObj.transition = (sliding) ? 'none' : 'transform 1s ease'; // транзишн стили
            return styleObj;
        };

        const orderStyles = (index, styleObj={}) => { // стили очереди
            const order = this.getOrder(index);
            styleObj.order = order; // высчитываем собственно очередь и далее собственно меняем стили в ее зависимости

            (this.state.direction === 'prev' && order === 0)
                ? styleObj.opacity = 0
                : styleObj.opacity = 1;

            if (order !== 1) {
                if (order === 0) {
                    styleObj.zIndex = 1;
                    styleObj.transform = 'scale(0.9) translateX(1300px)';
                    styleObj.transition = 'transform 950ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'
                } else {
                    styleObj.zIndex = 5;
                    styleObj.transform = 'scale(0.9)';
                    styleObj.transition = 'transform 950ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'
                }
            } else {
                styleObj.zIndex = 3;
                styleObj.transform = 'scale(1)';
                styleObj.transition = 'transform 950ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'
            }

            return styleObj; // возвращаем готовый массив стилей
        };

        const nums = (num) => { // функция для подставки 0, если число не двузначное
            let numString = String(num);
            return (numString.length === 1) ? "0" + numString : numString;
        };

        return (
            <div className={classes.locationsCarousel}>
                <Animated animationIn="bounceInRight"
                          animationOut="bounceOutRight"
                          isVisible={updateLocSet}
                          animationInDelay={onMountAnimationDelay}
                >
                    <div className={classes.wrapper}>
                        <div className={classes.carouselContainer} style={transformStyle(sliding, direction)}>
                            {
                                (locations.length !== 0)
                                    ? locations.map((location, index) => (
                                        <div className={classes.carouselSlot}
                                             key={location.name}
                                             style={orderStyles(index)}
                                        >
                                            <Location location={location}/>
                                        </div>
                                    ))
                                    : null
                            }
                        </div>
                    </div>
                </Animated>
                <Animated animationIn="fadeIn"
                          animationOut="fadeOut"
                          isVisible={updateLocSet}
                          animationInDelay={onMountAnimationDelay}
                          style={{animationDuration: '800ms'}}
                >
                    <div className={classes.navigationPanel}>
                        <Fab aria-label="Prev Location"
                            aria-haspopup="true"
                            onClick={() => this.prevSlide()}
                             classes={{
                                 root: classes.nextAndPrevButtons,
                                 disabled: classes.disabledNextAndPrevButtons,
                             }}
                            disabled={disableNavButtons}
                        >
                            <NavigateBefore className={classes.icon}/>
                        </Fab>
                        <Fab aria-label="Next Location"
                            aria-haspopup="true"
                            onClick={() => this.nextSlide()}
                            classes={{
                                root: classes.nextAndPrevButtons,
                                disabled: classes.disabledNextAndPrevButtons,
                            }}
                            disabled={disableNavButtons}
                        >
                            <NavigateNext className={classes.icon}/>
                        </Fab>
                        <div className={classes.numOfLocationsContainer}>
                            <p className={classNames(classes.numOfLocations, classes.activeNum)}>
                                {
                                    nums(position + 1)
                                }
                            </p>
                                <div className={classes.line} />
                            <p className={classNames(classes.numOfLocations, classes.generalNum)}>
                                {
                                    nums(locations.length)
                                }
                            </p>
                        </div>
                    </div>
                </Animated>
            </div>
        );
    }
}

LocationsCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(cityCarouselStyles, {withTheme: true})(LocationsCarousel);