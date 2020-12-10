import React, {PureComponent} from 'react';
import {LogBox} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { XStorage, XWidget } from 'react-native-easy-app';
import {RNStorage} from '../Common/storage/AppStorage';
import XLog from '../Common/utils/XLog';

export default class LaunchController extends PureComponent {

    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs();
        this.initAsync(); // this.initSync(); 两种初始化方式二选一( Choose one of two initialization methods )
    }

    initAsync = () => {
        XStorage.initStorage(RNStorage, AsyncStorage, () => {
            global.navigation = this.props.navigation;
            navigation.replace('Main');
        }, this.printLog);
    };

    initSync = async () => {
        let result = await XStorage.initStorageSync(RNStorage, AsyncStorage, this.printLog);
        if (result) {
            global.navigation = this.props.navigation;
            navigation.replace('Main');
        }
    };

    printLog = (data) => {
        data.map(([keyStr, value]) => {
            let [, key] = keyStr.split('#');
            XLog.log('持久化数据变更:', key, '<###>', value);
        });
    };


    render() {
        return null;
    }

}

