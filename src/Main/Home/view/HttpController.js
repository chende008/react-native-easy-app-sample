import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {NavigationBar} from '../../Common/widgets/WidgetNavigation';
import {showLoading, showToast} from '../../Common/widgets/Loading';
import ImageCropPicker from 'react-native-image-crop-picker'
import {RNItem} from '../../Common/widgets/WidgetDefault';
import {XHttp, XText} from 'react-native-easy-app';
import {Colors} from '../../Common/storage/Const';
import {isEmpty} from "../../Common/utils/Utils";
import {Api} from '../http/Api';

/**
 * 其它接口请求，接口返回的非json数据结构（纯文本&XML数据）
 */

export default class HttpController extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {content: '',};
        this.options = {
            width: 500,
            height: 500,
            mediaType: 'photo',
            cropping: true
        };
        this.uploadUrl = ''
    }

    render() {
        let {content} = this.state;
        return <>
            <NavigationBar title='请求示例'/>
            <RNItem text='简单数据：标准的json' onPress={() => this.moviesList()}/>
            <RNItem text='获取图片列表：标准的json' onPress={() => this.animalImageList()}/>
            <RNItem text='同步请求成员列表：标准的json' onPress={() => this.queryMemberList()}/>
            <RNItem text='省份、城市记录数量：返回 XML' onPress={() => this.getCityAmount()}/>
            <RNItem text='上传图片(需指定上传路径)' onPress={() => this.uploadFile()}/>
            <ScrollView>
                <XText style={{fontSize: 12, color: Colors.text_lighter, padding: 10}} text={content}/>
            </ScrollView>
        </>;
    }

    moviesList = () => {//返回标准的json的http请求
        XHttp().url(Api.moviesList).formJson().get((success, json, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.setState({content: JSON.stringify(json)});
            } else {
                showToast(msg);
            }
        });
    };

    animalImageList = () => {//返回标准的json的http请求
        XHttp().url(Api.filmsList).get((success, json, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.setState({content: JSON.stringify(json)});
            } else {
                showToast(msg);
            }
        });
    };

    queryMemberList = async () => {//同步请求数据
        let {success, json, message, status} = await XHttp().url(Api.queryMembers).loadingFunc((loading) => showLoading('请求中，请稍候...', loading)).execute('GET');

        success ? this.setState({content: JSON.stringify(json)}) : showToast(message);

        /***
         * 或者得使用标准的promise方式解析数据（异步promise）
         *
         * XHttp().url(Api.queryMembers).execute('GET').then(({success, json, message, status}) => {
            if (success) {
                showToast('请求成功');
                this.setState({content: JSON.stringify(json)});
            } else {
                showToast(message);
            }
        }).catch(({message}) => {
            showToast(message);
        })
         */

    };

    getCityAmount = () => {//查询各城市Mobile服务数量
        XHttp().url(Api.queryCitiesAmount)
            .contentType('text/xml; charset=utf-8')
            .loadingFunc((loading) => showLoading('请求中，请稍候...', loading))
            .pureText().get((success, data, msg, code) => {
            if (success) {
                showToast('请求成功');
                this.setState({content: data});
            } else {
                showToast(msg);
            }
        });
    };

    uploadFile = () => {
        if (isEmpty(this.uploadUrl)) {
            showToast('请设置上传目标接口：uploadUrl');
            return
        }
        ImageCropPicker.openPicker(this.options).then(response => {

            const fileObj = {uri: response.path, type: 'multipart/form-data', name: 'image.png'};

            XHttp().url(this.uploadUrl).formData()
                .param({file: fileObj})
                .loadingFunc(loading => showLoading('上传中，请稍候...', loading, true))
                .post((success, json, message) => {
                    if (success) {
                        showToast('上传成功!' + JSON.stringify(json))
                    } else {
                        showToast(message)
                    }
                })
        }).catch(error => {
            console.log(error)
        })
    }

}

