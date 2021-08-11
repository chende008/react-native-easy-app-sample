import React, {PureComponent} from 'react';

import {StyleSheet, View} from 'react-native';
import {Colors, Const} from '../../Common/storage/Const';
import {XFlatList, XHttp, XImage, XText, XView, RefreshStatus} from 'react-native-easy-app';
import {NavigationBar} from '../../Common/widgets/WidgetNavigation';
import {Api} from '../http/Api';
import {showToast} from '../../Common/widgets/Loading';
import {netWorkException} from "../../Common/utils/Utils";

const headerText = '分页列表支持：无网络，加载中，无数据，加载错误，加载更多等一系列状态展示';

export default class RefreshController extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {dataList: []};
        this.pageIndex = 1;//页码
    }

    render() {
        let {dataList} = this.state;
        return <>
            <NavigationBar title='XFlatList组件'/>
            <XFlatList data={dataList}
                       onRefresh={() => this.queryDataList(true)}
                       onLoadMore={() => this.queryDataList(false)}
                       refreshStatus={{
                           RefreshingData: {text: '加载中，请稍候...'},
                           LoadingMoreData: {moreText: '加载更多数据，请稍候...'}
                       }}
                       ListHeaderComponent={() => <XText style={styles.header} text={headerText}/>}
                       ref={refreshList => this.refreshList = refreshList}
                       renderItem={({item, index}) => this.renderItem(item, index)}/>
        </>;
    }

    componentDidMount() {
        this.queryDataList(true);
    }

    queryDataList = (isPullDown) => {
        let {dataList} = this.state;
        this.pageIndex = isPullDown ? 1 : this.pageIndex + 1;
        this.refreshList && this.refreshList.refreshPreLoad(isPullDown);
        let params = {page: isPullDown ? 1 : this.pageIndex};
        XHttp().url(Api.queryAnimations).param(params).get((success, {results, last_page}, msg, code) => {
            this.refreshList && this.refreshList.refreshLoaded(success, isPullDown, params.page >= last_page, netWorkException(code));
            if (success) {
                this.setState({dataList: isPullDown ? results : [...dataList, ...results]});
            } else {
                showToast(msg);
            }
        });
    };

    renderItem = (item, index) => {
        let {title, image_url, type, score, synopsis, members} = item;
        return <XView key={index} style={styles.itemParent}>
            <XImage style={{width: 120, height: 120, margin: 5}} resizeMode='contain' icon={image_url}/>
            <XView style={{flex: 1}}>
                <XText style={{fontSize: 14, fontWeight: 'bold', color: Colors.text, paddingRight: 5}} text={'名称：' + title}/>
                <XText style={styles.itemDesc} numberOfLines={4} text={synopsis}/>
                <XText style={{fontSize: 12, color: Colors.text}} text={'评分：' + score + '    参与人数：' + members}/>
            </XView>
        </XView>;
    };


}

const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
        paddingHorizontal: 10,
        fontSize: 12,
        lineHeight: 16,
        color: Colors.red,
    },
    itemParent: {
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: Const.onePixel,
        borderBottomColor: Colors.split_line,
        backgroundColor: Colors.white
    },
    itemDesc: {
        flex: 1,
        fontSize: 12,
        lineHeight: 16,
        paddingRight: 8,
        paddingVertical: 5,
        color: Colors.text_lighter,
    },
});
