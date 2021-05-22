
const {ccclass, property} = cc._decorator;

@ccclass
export default class result extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("show result");
    }

    start () {

    }

    // update (dt) {}
}
