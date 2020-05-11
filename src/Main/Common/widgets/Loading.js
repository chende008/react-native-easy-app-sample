import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Toast, {Manager} from 'react-native-root-toast';
import {isEmpty} from '../utils/Utils';
import {XText, XView} from 'react-native-easy-app';
import {Const} from '../storage/Const';

let siblings = undefined;
let toast = null;

export const Loading = {

    show: (text, showIndicator = true) => {
        siblings = new Manager(
            <View style={[styles.maskStyle, {backgroundColor: showIndicator ? 'rgba(0, 0, 0, 0.6)' : 'transparent'}]}>
                <XView style={[styles.backViewStyle, {paddingVertical: showIndicator ? 16 : 0}]}>
                    {showIndicator && <ActivityIndicator style={{marginBottom: 5}} size="large" color="white"/>}
                    {text && <XText style={styles.textStyle} allowFontScaling={false} text={text} numberOfLines={1}/>}
                </XView>
            </View>,
        );
        return siblings;
    },

    hidden: () => {
        if (siblings instanceof Manager) {
            siblings.destroy();
        }
    },

};

export function showLoading(text, isShow, showIndicator = true) {
    isShow ? Loading.show(text, showIndicator) : Loading.hidden();
}

export function showToast(content) {
    if (isEmpty(content)) {
        return;
    }
    if (toast) {//隐藏已经存在的toast
        setTimeout(() => Toast.hide(toast), 0);
    }
    setTimeout(() => toast = Toast.show(content, {animation: true, position: Toast.positions.CENTER}), 0);
}

const styles = StyleSheet.create({
        maskStyle: {
            position: 'absolute',
            width: Const.screenWidth,
            height: Const.screenHeight,
            alignItems: 'center',
            justifyContent: 'center',
        },
        backViewStyle: {
            minWidth: 100,
            minHeight: 40,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#111',
            maxWidth: Const.screenWidth * 0.7,
        },
        textStyle: {
            fontSize: 14,
            color: 'white',
            paddingHorizontal: 15,
        },
    },
);
