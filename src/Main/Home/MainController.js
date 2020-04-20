import React, {PureComponent} from 'react';
import {BackHandler, SafeAreaView, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {NavigationBar} from '../Common/widgets/WidgetNavigation';
import {RNItem} from '../Common/widgets/WidgetDefault';
import HttpConfig from './http/HttpConfig';
import {DebugManager} from "react-native-debug-tool";
import {showToast} from "../Common/widgets/Loading";
import {Manager} from 'react-native-root-toast'
import DeviceInfo from 'react-native-device-info';
import {Notify} from "../Common/events/Notify";
import {RNStorage} from "../Common/storage/AppStorage";

let lastClickTime = (new Date()).valueOf();

export default class MainController extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
        this.initConfig();
    }

    render() {
        return <SafeAreaView>
            <NavigationBar title='RNDemo' rightText='调试工具' clickRText={() => {
                DebugManager.showFloat(Manager)
            }} hideBack/>
            <RNItem text='Http请求' onPress={() => Actions.http()}/>
            <RNItem text='数据存储' onPress={() => Actions.storage()}/>
            <RNItem text='基础控件' onPress={() => Actions.widget()}/>
            <RNItem text='刷新列表' onPress={() => Actions.refreshList()}/>
            <RNItem text='WebView' onPress={() => Actions.webView()}/>
        </SafeAreaView>;
    }

    componentDidMount(): void {
        this.listener = this.backListener();
        Notify.TOKEN_EXPIRED.register(this.tokenExpired)
    }

    componentWillUnmount(): void {
        this.listener && this.listener.remove();
        Notify.TOKEN_EXPIRED.unRegister(this.tokenExpired)
    }

    initConfig = () => {
        HttpConfig.initDemo();
        let serverUrlMap = new Map();
        serverUrlMap.set('Online', 'https://www.baidu.com');
        for (let i = 1; i < 9; i++) {
            serverUrlMap.set('test00' + i, `https://domain-00${i}.net`)
        }
        DebugManager.initDeviceInfo(DeviceInfo)
            .initServerUrlMap(serverUrlMap, RNStorage.baseUrl, (baseUrl) => {
                // RFHttpConfig().initBaseUrl(baseUrl); // 重置Http请求baseUrl 根据实际情况调用
                RNStorage.baseUrl = baseUrl;
                setTimeout(() => Alert.alert('环境切换', '服务器环境已经切换至' + baseUrl), 1000)
            });
        DebugManager.showFloat(Manager);
    };


    backListener = () => {
        return BackHandler.addEventListener('hardwareBackPress', () => {
            if (Actions.currentScene === 'main') {
                let nowTime = (new Date()).valueOf();
                if (nowTime - lastClickTime < 1000) {//间隔时间小于1秒才能退出
                    BackHandler.exitApp();
                } else {
                    showToast('再按一次，退出Example');
                    lastClickTime = nowTime;
                }
                return true;
            }
            return false;
        });
    };

    tokenExpired = ({message}) => { // token 过期需要处理的逻辑
        Alert.alert('Token 过期 ', message)
    };
}
