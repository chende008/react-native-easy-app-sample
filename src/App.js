import React from 'react';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {XWidget} from "react-native-easy-app";
import {Assets} from "./Main/Home/http/Api";

import LaunchController from "./Main/Welcome/LaunchController";
import MainController from "./Main/Home/MainController";
import StorageController from "./Main/Home/storage/StorageController";
import WidgetController from "./Main/Home/view/WidgetController";
import RefreshController from "./Main/Home/view/RefreshController";
import HttpController from "./Main/Home/view/HttpController";
import WebViewController from "./Main/Home/view/WebViewController";

export default function App() {
    console.disableYellowBox = true;
    return <SafeAreaProvider>
        <NavigationContainer>
            <ScreenList/>
        </NavigationContainer>
    </SafeAreaProvider>
}

function ScreenList() {
    global.EdgeInsets = useSafeAreaInsets();
    XWidget.initResource(Assets).initReferenceScreen(375, 677);
    const {Navigator, Screen} = createStackNavigator();
    return <Navigator initialPage={LaunchController} headerMode='none'>
        <Screen name='Launch' component={LaunchController}/>
        <Screen name='Main' component={MainController} options={{animationEnabled: false}}/>
        <Screen name='Http' component={HttpController}/>
        <Screen name='Storage' component={StorageController}/>
        <Screen name='Widget' component={WidgetController}/>
        <Screen name='XFlatList' component={RefreshController}/>
        <Screen name='WebView' component={WebViewController}/>
    </Navigator>;
}
