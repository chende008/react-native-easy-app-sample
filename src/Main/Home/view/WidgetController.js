import React, {PureComponent} from 'react';

import {Image, ScrollView, StyleSheet} from 'react-native';
import {Colors, Const, ImageRes} from '../../Common/storage/Const';
import {XImage, XText, XView} from 'react-native-easy-app';
import {NavigationBar} from '../../Common/widgets/WidgetNavigation';
import {showToast} from '../../Common/widgets/Loading';

const imgUrl = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=108036961,3500928712&fm=26&gp=0.jpg';

export default class WidgetController extends PureComponent {

    render() {
        return <>
            <NavigationBar title='基础组件'/>
            <ScrollView>
                <XText style={styles.grayText} text='文本显示'/>
                <XText style={styles.text} onPress={() => showToast('点击事件')} text='文本显示（有触摸效果）'/>
                <XView style={styles.iconTextParent}>
                    <XText style={styles.iconText} text='文本' icon={ImageRes.mine_focus_shop} iconSize={20} iconPosition='left'/>
                    <XText style={styles.iconText} text='文本' icon={require('../../../../images/conan.jpeg')} iconSize={20} iconPosition='right'/>
                    <XText style={styles.iconText} text='文本' icon={ImageRes.mine_focus_shop} iconSize={20} iconPosition='top'/>
                    <XText style={styles.iconText} text='可点击' icon={ImageRes.mine_focus_shop} iconSize={20} iconPosition='bottom' onPress={() => showToast('点击事件')}/>
                    <XText style={styles.iconText} text='无图标'/>
                </XView>
                <XText style={styles.rnTextItem} text='订单' icon={ImageRes.right_arrow} iconSize={16} iconPosition='right' textExtend={true} onPress={() => showToast('点击了订单')}/>
                <XView style={{backgroundColor: Colors.white, marginBottom: 30}}>
                    <XText style={styles.rnSearch} text='请输入客户姓名...' icon={ImageRes.search_icon} iconSize={16} iconPosition='left' iconMargin={6} onPress={() => showToast('点击跳转去搜索')}/>
                </XView>
                <XView style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
                    <XImage style={{width: 65, height: 65}} icon={ImageRes.login_logo}/>
                    <XImage style={{width: 65, height: 65}} icon={require('../../../../images/conan.jpeg')}/>
                    <XImage style={styles.rnImage} icon={imgUrl} onPress={() => showToast('柯南')}/>
                    <XImage style={{width: 65, height: 65}} icon={ImageRes.mine_setting} onPress={() => showToast('点击事件')}/>
                    <XImage style={{width: 65, height: 65}} icon={ImageRes.mine_setting} onPress={() => showToast('点击事件')} iconSize={30}/>
                </XView>
                <Image style={{width: '90%', height: 200, alignSelf: 'center'}} source={require('../../../../images/conan.jpeg')}/>
            </ScrollView>
        </>;
    }
}

const styles = StyleSheet.create({
    grayText: {
        margin: 5,
        padding: 12,
        fontSize: 16,
        color: Colors.text,
        backgroundColor: Colors.split_line,
    },
    text: {
        margin: 5,
        padding: 10,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 20,
        textAlign: 'center',
        color: Colors.white,
        borderColor: Colors.white,
        backgroundColor: Colors.blue,
    },
    rnTextItem: {
        fontSize: 15,
        padding: 15,
        marginBottom: 30,
        color: Colors.text,
        backgroundColor: Colors.white,
        borderBottomWidth: Const.onePixel,
        borderBottomColor: Colors.split_line,
    },
    rnSearch: {
        margin: 10,
        fontSize: 13,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        color: Colors.text_disable,
        backgroundColor: Colors.page_bg,
    },
    rnImage: {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderRadius: 35,
        borderColor: Colors.blue,
    },
    iconTextParent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    iconText: {
        fontSize: 14,
        color: Colors.blue,
        backgroundColor: Colors.page_bg,
    },
});
