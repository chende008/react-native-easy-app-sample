import React from 'react';

export const Api = {//非标准
    moviesList: 'https://facebook.github.io/react-native/movies.json',//影片列表
    filmsList: 'https://ghibliapi.herokuapp.com/films',//影片列表2
    queryCitiesAmount: 'http://www.webxml.com.cn/WebServices/MobileCodeWS.asmx/getDatabaseInfo',//查询各城市Mobile服务数量
    queryAnimations: 'https://api.jikan.moe/v3/search/anime?q=Fate/Zero',//动漫列表
    queryMembers: 'https://ghibliapi.herokuapp.com/people',//查询成员列表
};

export const ApiO2O = {
    baseUrl: 'http://www.baidu.com/',
};

export const ApiCredit = {
    baseUrl: 'http://www.baidu.com/',
    refreshToken: 'api/refreshToken',
};

export const Assets = 'http://www.baidu.com';
