import React from 'react';

export const Api = {//非标准
    animalImageList: 'https://api.jikan.moe/v3/character/1/pictures',//获取动画图片列表
    queryCitiesAmount: 'http://www.webxml.com.cn/WebServices/MobileCodeWS.asmx/getDatabaseInfo',//查询各城市Mobile服务数量
    queryAnimations: 'https://api.jikan.moe/v3/search/anime?q=Fate/Zero',//动漫列表
    queryMembers: 'https://api.jikan.moe/v3/club/1/members',//查询成员列表
};

export const ApiO2O = {
    baseUrl: 'http://www.baidu.com/',
};

export const ApiCredit = {
    baseUrl: 'http://www.baidu.com/',
    refreshToken: 'api/refreshToken',
};

export const Assets = 'http://www.baidu.com';
