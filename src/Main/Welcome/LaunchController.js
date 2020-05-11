import React, {PureComponent} from 'react';

import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {XStorage, XWidget} from 'react-native-easy-app';
import {RNStorage} from '../Common/storage/AppStorage';
import {Assets} from "../Home/http/Api";
import XLog from "../Common/utils/XLog";

export default class LaunchController extends PureComponent {

    constructor(props) {
        super(props);
        this.init();
    }

    init = () => {
        console.disableYellowBox = true;
        XStorage.initStorage(RNStorage, () => {
            Actions.reset('main');
        }, (data) => {
            this.printLog(data)
        }, '1.0', AsyncStorage);
        XWidget.initResource(Assets).initReferenceScreen(375, 677);
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

