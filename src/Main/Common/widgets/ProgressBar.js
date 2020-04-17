import React, {PureComponent} from 'react'
import {Animated, Easing, View} from 'react-native'
import PropTypes from 'prop-types'
import {Const} from "../storage/Const";

export default class ProgressBar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
        this.animationStarted = false;
        this.firstWidth = new Animated.Value(0);
        this.firstTransX = new Animated.Value(0);
        this.secondWidth = new Animated.Value(Const.screenWidth / 2);
        this.secondTransX = new Animated.Value(-Const.screenWidth / 2)
    }

    render() {
        return (
            <View style={[{backgroundColor: 'transparent', width: Const.screenWidth, height: 3}, this.props.style]}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 3,
                        backgroundColor: '#01A0F2',
                        width: this.firstWidth,
                        transform: [{translateX: this.firstTransX}]
                    }}
                />
                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 3,
                        backgroundColor: '#01A0F2',
                        width: this.secondWidth,
                        transform: [{translateX: this.secondTransX}]
                    }}
                />
            </View>
        )
    }

    showAnimal = () => {
        if (this.animationStarted) return;
        this.animationStarted = true;
        this.animationSet = Animated.parallel([
            Animated.timing(this.firstWidth, {
                toValue: Const.screenWidth / 2,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(this.firstTransX, {
                toValue: Const.screenWidth,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(this.secondWidth, {
                toValue: 15,
                duration: 1000,
                delay: 1000,
                easing: Easing.linear
            }),
            Animated.timing(this.secondTransX, {
                toValue: Const.screenWidth,
                duration: 1000,
                delay: 1000,
                easing: Easing.linear
            })
        ]);
        this.animationSet.start(() => {
            if (this.props.loading) {//若为载中，继续执行动画
                this.firstTransX.resetAnimation();
                this.firstWidth.resetAnimation();
                this.secondTransX.resetAnimation();
                this.secondWidth.resetAnimation();
                this.showAnimal()
            }
        })
    };

    markToFinished = () => {//标记为动画结束
        this.animationStarted = false
    };

    static propTypes = {
        loading: PropTypes.bool
    }
}
