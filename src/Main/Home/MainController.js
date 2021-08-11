import React, {PureComponent} from 'react';
import {Alert, BackHandler} from 'react-native';
import {NavigationBar} from '../Common/widgets/WidgetNavigation';
import {RNItem} from '../Common/widgets/WidgetDefault';
import HttpConfig from './http/HttpConfig';
import {DebugManager} from 'react-native-debug-tool';
import {showToast} from '../Common/widgets/Loading';
import {Manager} from 'react-native-root-toast';
import DeviceInfo from 'react-native-device-info';
import {Notify} from '../Common/events/Notify';
import {RNStorage} from '../Common/storage/AppStorage';

let lastClickTime = (new Date()).valueOf();

export default class MainController extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
        this.initConfig();
    }

    render() {
        return <>
            <NavigationBar title='EasyApp' rightText='调试工具' clickRText={() => DebugManager.showFloat(Manager)} hideBack/>
            <RNItem text='Http请求' onPress={() => navigation.push('Http')}/>
            <RNItem text='数据存储' onPress={() => navigation.push('Storage')}/>
            <RNItem text='基础控件' onPress={() => navigation.push('Widget')}/>
            <RNItem text='刷新列表' onPress={() => navigation.push('XFlatList')}/>
            <RNItem text='WebView' onPress={() => navigation.push('WebView')}/>
        </>;
    }

    componentDidMount() {
        this.listener = this.backListener();
        Notify.TOKEN_EXPIRED.register(this.tokenExpired);
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
        Notify.TOKEN_EXPIRED.unRegister(this.tokenExpired);
    }

    initConfig = () => {
        HttpConfig.initDemo();
        let serverUrlMap = new Map();
        serverUrlMap.set('Online', 'https://www.baidu.com');
        for (let i = 1; i < 9; i++) {
            serverUrlMap.set('test00' + i, `https://domain-00${i}.net`);
        }
        DebugManager.initDeviceInfo(DeviceInfo)
            .initServerUrlMap(serverUrlMap, RNStorage.baseUrl, (baseUrl) => {
                // XHttpConfig().initBaseUrl(baseUrl); // 重置Http请求baseUrl 根据实际情况调用
                RNStorage.baseUrl = baseUrl;
                setTimeout(() => Alert.alert('环境切换', '服务器环境已经切换至' + baseUrl), 1000);
            });
        DebugManager.showFloat(Manager);
    };


    backListener = () => {
        return BackHandler.addEventListener('hardwareBackPress', () => {
            const {state} = navigation.dangerouslyGetState().routes[0];
            if (state && state.index !== 0) {// 若不是第一个Tab，则切换到第一个Tab
                navigation.navigate('Main');
                return true;
            }
            if (navigation.canGoBack()) {// 若能返回，则不拦截
                return false;
            } else {
                let nowTime = (new Date()).valueOf();
                if (nowTime - lastClickTime < 1000) {//间隔时间小于1秒才能退出
                    BackHandler.exitApp();
                } else {
                    showToast('再按一次，退出 EasyApp');
                    lastClickTime = nowTime;
                }
                return true;
            }
        });
    };

    tokenExpired = ({message}) => { // token 过期需要处理的逻辑
        Alert.alert('Token 过期 ', message);
    };
}
