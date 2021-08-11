import React from 'react';
import {RNStorage} from '../../Common/storage/AppStorage';
import {XHttpConfig, XHttpConst} from 'react-native-easy-app';
import {isEmpty, selfOr} from '../../Common/utils/Utils';
import {showToast} from '../../Common/widgets/Loading';
import {ApiCredit, ApiO2O} from './Api';
import AuthToken from './AuthToken';
import {DebugManager} from 'react-native-debug-tool';
import {Notify} from '../../Common/events/Notify';
import NetInfo from '@react-native-community/netinfo';

/**
 * RN Http请求 库设置类
 */
export default class HttpConfig {

    static initDemo() {
        XHttpConfig().initLogOn(true)
            .initNetworkExceptionFunc(NetInfo, (msg, code) => true)
            // .initBaseUrl('https://www.baidu.com')
            .initParseDataFunc((result, request, callback) => {
                let {success, json, message, status, response} = result;
                DebugManager.appendHttpLogs(request.params, response);
                if (status === 503) {// token 过期
                    Notify.TOKEN_EXPIRED.sendEvent({message});
                } else {
                    callback(success, json, message, status, response);
                }
            });
    }

    static httpToken() {
        XHttpConfig()
            .initHttpLogOn(true)
            .initBaseUrl(ApiO2O.baseUrl)
            .initContentType(XHttpConst.CONTENT_TYPE_URLENCODED)
            .initParamSetFunc((params, request) => {
                if (request.internal && !isEmpty(RNStorage.accessToken)) {
                    params.access_token = RNStorage.accessToken;
                }
            })
            .initParseDataFunc((result, request, callback) => {
                let {success, json, message, status, response} = result;
                if (status === 401) {//Token过期
                    showToast('token过期，请重新登录');
                } else {
                    let {data, errorCode, msg, extra} = json;
                    callback(success && 'SUCCESS'.equals(errorCode), selfOr(data, {}), selfOr(msg, message), errorCode);
                }
            });
    }


    static httpToken2() {
        XHttpConfig()
            .initHttpLogOn(true)
            .initBaseUrl(ApiCredit.baseUrl)
            .initContentType(XHttpConst.CONTENT_TYPE_URLENCODED)
            .initHeaderSetFunc((headers, request) => {
                if (request.internal) {
                    Object.assign(headers, AuthToken.baseHeaders());//添加基础参数
                    headers.customerId = RNStorage.customerId;
                    if (RNStorage.refreshToken) {//若refreshToken不为空，则拼接
                        headers['access-token'] = RNStorage.accessToken;
                        headers['refresh-token'] = RNStorage.refreshToken;
                    }
                }
            })
            .initParamSetFunc((params, request) => {
                if (request.internal && RNStorage.customerId) {
                    params.CUSTOMER_ID = RNStorage.customerId;
                }
            }).initParseDataFunc((result, request, callback) => {
            let {success, json, response, message, status} = result;
            AuthToken.parseTokenRes(response);//解析token
            if (status === 503) {//指定的Token过期标记
                this.refreshToken(request, callback);
            } else {
                let {successful, msg, code} = json;
                callback(success && successful === 1, selfOr(json.data, {}), selfOr(msg, message), code);
            }
        });
    }

    static refreshToken(request, callback) {
        if (global.hasQueryToken) {
            global.tokenExpiredList.push({request, callback});
        } else {
            global.hasQueryToken = true;
            global.tokenExpiredList = [{request, callback}];
            const refreshUrl = `${RNStorage.baseUrl}api/refreshToken?refreshToken=${RNStorage.refreshToken}`;
            fetch(refreshUrl).then(resp => {
                resp.json().then(({successful, data: {accessToken}}) => {
                    if (successful === 1) {// 获取到新的accessToken
                        RNStorage.accessToken = accessToken;
                        global.tokenExpiredList.map(({request, callback}) => {
                            request.resendRequest(request, callback);
                        });
                        global.tokenExpiredList = [];
                    } else {
                        console.log('Token 过期，退出登录');
                    }
                });
            }).catch(err => {
                console.log('Token 过期，退出登录');
            }).finally(() => {
                global.hasQueryToken = false;
            });
        }
    };

}
