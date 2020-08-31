import React from 'react';

import {StatusBar, StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import {isEmpty, isIos} from '../utils/Utils';
import {Colors, CommonStyles, ImageRes} from '../storage/Const';
import {XImage, XText, XView} from 'react-native-easy-app';

export function NavigationBar({onBack, clickRText, clickRImage, ...props}) {
    let {title, hideBack = false, rightImage, rightText, noLine = false, bgColor = Colors.white, barStyle = 'dark-content'} = props;
    let lineStyle = noLine ? {} : CommonStyles.bottomLine;
    return <View style={{backgroundColor: bgColor}}>
        <StatusBar backgroundColor={Colors.white} barStyle={barStyle}/>
        {isIos() && <View style={{height: EdgeInsets.top}}/>}
        <XView style={[styles.titleBarParent, lineStyle]}>
            {!isEmpty(title) && <XText style={styles.titleText} numberOfLines={1} text={title}/>}
            {!hideBack && <XImage style={styles.leftImage} icon={ImageRes.img_back} iconSize={22} onPress={() => onBack && onBack()}/>}
            {rightText && <XText style={[styles.rightText]} text={rightText} onPress={() => clickRText && clickRText()}/>}
            {rightImage && <XImage style={styles.rightImage} icon={rightImage} iconSize={22} onPress={() => clickRImage && clickRImage()}/>}
        </XView>
    </View>;
}

NavigationBar.propTypes = {// 标题栏属性
    onBack: PropTypes.func,
    title: PropTypes.string,
    hideBack: PropTypes.bool,
    rightText: PropTypes.string,
    clickRText: PropTypes.func,
    bgColor: PropTypes.string,
    barStyle: PropTypes.object,
};

NavigationBar.defaultProps = {onBack: () => navigation.pop()};// 标题栏属性默认值

const styles = StyleSheet.create({
    titleBarParent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    leftImage: {
        left: 0,
        width: 45,
        height: '100%',
        paddingLeft: 5,
        position: 'absolute',
    },
    rightImage: {
        right: 0,
        width: 45,
        height: '100%',
        paddingLeft: 8,
        position: 'absolute',
    },
    titleText: {
        flex: 1,
        fontSize: 17,
        textAlign: 'center',
        color: Colors.text,
        paddingHorizontal: 50,
    },
    rightText: {
        right: 0,
        padding: 10,
        fontSize: 13,
        color: Colors.text,
        position: 'absolute',
    },
});

