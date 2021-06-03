import { EventIDS } from "./event/EvenID";
import EventDispath from "./event/Event";
import { utils } from "./utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class guide extends cc.Component {

    @property(cc.Node)
    study: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.study.on(cc.Node.EventType.TOUCH_END,  () => {
            this.onClose()
        }, this)
        utils.btnEffect1(this.study);
    }

    start () {

    }

    onClose(){
        this.node.destroy();
    }
}
