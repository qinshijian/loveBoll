import { EventIDS } from "./event/EvenID";
import EventDispath from "./event/Event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class result extends cc.Component {

    @property(cc.Label)
    tips: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("show result");
    }

    start () {

    }

    setData(data){
        this.tips.string = data;
    }

    onAgain(){
        this.node.removeFromParent();
        EventDispath.getInstance().send(EventIDS.CMD_RET_BALL_STATU)
    }

    onNext(){
        this.node.removeFromParent();
        EventDispath.getInstance().send(EventIDS.CMD_RET_BALL_STATU)
    }
}
