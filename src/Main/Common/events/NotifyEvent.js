import {EventEmitter} from 'events'

export default class NotifyEvent {

    constructor(eventName) {
        this.eventName = eventName;
        if (!global.eventEmitter) {
            global.eventEmitter = new EventEmitter();
        }
    }

    register = func => {
        return global.eventEmitter.addListener(this.eventName, func);
    };

    unRegister = func => {
        return global.eventEmitter.removeListener(this.eventName, func);
    };

    sendEvent = targetObj => {
        global.eventEmitter.emit(this.eventName, targetObj);
    }
}
