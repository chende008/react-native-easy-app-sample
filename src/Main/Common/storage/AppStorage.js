import React from 'react';
import DeviceInfo from 'react-native-device-info';

export const RNStorage = {//持久化数据列表
    customerId: undefined,//客户ID
    accessToken: undefined,//OAuth2.0 accessToken
    refreshToken: undefined,//OAuth2.0 refreshToken
    baseUrl: undefined,
    str: undefined,//测试符串
    json: undefined,//测试json
    jsonArray: undefined,//测试jsonArray
    [DeviceInfo.getBundleId()]: undefined,
};

export const RNData = {//临时内存数据
    LogOn: true,//展示日志
    canGoBack: false,//webView返回标记
    tokenExpiredList: [],
    hasQueryToken: null,
    userAgent: {//http请求使用
        package: DeviceInfo.getBundleId,
        os_version: DeviceInfo.getSystemVersion(),
        package_name: DeviceInfo.getBundleId(),
        app_version: DeviceInfo.getVersion(),
        device_name: DeviceInfo.getModel(),
        default_ua: DeviceInfo.getUserAgentSync,
    },
};
