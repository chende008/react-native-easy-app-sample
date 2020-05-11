import {Linking} from "react-native";
import {Notify} from "../events/Notify";
import XLog from "./XLog";

export default class WebUtils {

    static msgFromH5(data, webView) {
        XLog.log('来自H5消息', JSON.stringify(data));
        if (typeof data !== 'object') return; //不接收非对象数据
        let {type, value} = data;
        switch (type) {
            case 'toLogin': //跳转到登录界面（H5页面Token过期）
                Notify.TOKEN_EXPIRED.sendEvent({message: 'H5 页面Token过期'});
                break;
            case 'openUrl':
                Linking.openURL(value);
                break;
            default:
                break
        }
    }

    static postMsgToH5(type, data, webView) {
        switch (type) {

        }
    }

    static initInjectJs() {
        return `${this.vConsole()}
        (function () {
            function wrap(fn) {
                return function wrapper() {
                    var res = fn.apply(this, arguments);
                    data = {
                        'title': document.title,
                        'TitleEvent': 'navigationStateChange'
                    }
                    window.ReactNativeWebView.postMessage(JSON.stringify(data));
                    return res;
                }
            }

            history.pushState = wrap(history.pushState);
            history.replaceState = wrap(history.replaceState);
            window.addEventListener('popstate', function () {
                data = {
                    'title': document.title,
                    'TitleEvent': 'navigationStateChange'
                }
                window.ReactNativeWebView.postMessage(JSON.stringify(data));
            });
        })();
        
        true;`
    }

    static vConsole() {
        return ` var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js'
        document.head.appendChild(script)

        setTimeout(() => {
        var script2 = document.createElement('script')
        script2.type = 'text/javascript'
        script2.innerHTML = 'new VConsole()'
        document.head.appendChild(script2)
      }, 2000)
        `
    }

}

