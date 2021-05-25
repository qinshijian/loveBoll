
export default class EventDispath {
    NotificationCenter : cc.EventTarget;
    constructor() {
        this.NotificationCenter = new cc.EventTarget();
    }

    addEventListener (type:string, callback:(notice:any)=>void, target) {
        this.NotificationCenter.on(type, callback, target);
    }

    send(eventID, arg1?: any) {
        this.NotificationCenter.emit(eventID, arg1);
    }

    removeEventListenersByEvent(type:string, callback:(notice:any)=>void, target) {
        this.NotificationCenter.off(type, callback, target);
    }

    removeEventListeners(target) {
        this.NotificationCenter.targetOff(target);
    }

    public static singleton:EventDispath;

    public static getInstance(): EventDispath{
        if(!this.singleton){
            this.singleton = new EventDispath();
        }
        return this.singleton;
    }
}