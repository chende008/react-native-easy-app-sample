import React, {PureComponent} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {XStorage, XWidget} from 'react-native-easy-app';
import {RNStorage} from '../Common/storage/AppStorage';
import XLog from "../Common/utils/XLog";

export default class LaunchController extends PureComponent {

    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        console.disableYellowBox = true;
        XStorage.initStorage(RNStorage, () => {
            global.navigation = this.props.navigation;
            navigation.replace('Main')
        }, (data) => {
            this.printLog(data)
        }, '1.0', AsyncStorage);
    };

    printLog = (data) => {
        data.map(([keyStr, value]) => {
            let [, key] = keyStr.split('#');
            XLog.log('持久化数据变更:', key, '<###>', value);
        })
    };

    render() {
        return null;
    }

}

