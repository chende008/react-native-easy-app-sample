import React from 'react';

import {toStr} from "./Utils";
import {RNData} from "../storage/AppStorage";
import {DebugManager} from "react-native-debug-tool";

export default class XLog {

    static log(...args) {
        args.map((item, index) => args[index] = toStr(item));
        RNData.LogOn && console.log(args.join(''));
        DebugManager.appendLogs(args.join(''))
    }

    static warn(...args) {
        args.map((item, index) => args[index] = toStr(item));
        RNData.LogOn && console.warn(...args);
    }

    static error(...args) {
        args.map((item, index) => args[index] = toStr(item));
        RNData.LogOn && console.error(...args);
    }
}
