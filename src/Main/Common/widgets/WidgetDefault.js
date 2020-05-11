import React from 'react';

import PropTypes from 'prop-types';
import {Colors, Const, ImageRes} from "../storage/Const";
import {XText} from 'react-native-easy-app';
import {StyleSheet} from "react-native";
import XLog from "../utils/XLog";

export function RNLine({style, ...props}) {//分割线（若为水平线，支持左边距属性形式设置）
    let {vertical = false, bold = false, leftMargin} = props;
    let lineSize = bold ? 1 : Const.onePixel;//分割线的粗细
    let lineStyle = vertical ?
        {width: lineSize, backgroundColor: Colors.split_line} :
        {height: lineSize, backgroundColor: Colors.split_line, marginLeft: leftMargin};
    return <XText style={[lineStyle, style]} {...props}/>
}

RNLine.propTypes = {vertical: PropTypes.bool, bold: PropTypes.bool, leftMargin: PropTypes.number};

export function RNBtn({style = {}, key, onPress, ...props}) {
    let {text, borderRadius = 5, checked = false, raw = false, enabled = true} = props;
    let textStyle = (checked || !enabled) ? {color: Colors.text_disable, backgroundColor: Colors.disable} : {color: Colors.text, backgroundColor: Colors.theme};
    return <XText key={key} style={[styles.btnText, {borderRadius: borderRadius}, textStyle, style]} raw={raw} text={text} onPress={() => (enabled && onPress) && onPress()} {...props}/>
}

RNBtn.propTypes = {text: PropTypes.string, raw: PropTypes.bool, checked: PropTypes.bool, borderRadius: PropTypes.number};

export function RNItem({text, style, onPress, noArrow, ...props}) {
    return <XText style={[styles.rnTextItem, style]}
                  text={text}
                  iconSize={16}
                  onPress={() => {
                       onPress && onPress();
                       XLog.log('进入', text)
                   }}
                  iconPosition='right'
                  icon={noArrow ? '' : ImageRes.right_arrow}
                  textExtend {...props}/>
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: 16,
        padding: 12,
        color: Colors.text,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rnTextItem: {
        fontSize: 15,
        padding: 15,
        color: Colors.text,
        backgroundColor: Colors.white,
        borderBottomWidth: Const.onePixel,
        borderBottomColor: Colors.split_line
    },
});
