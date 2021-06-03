import { EventIDS } from "./event/EvenID";
import EventDispath from "./event/Event";

const {ccclass, property} = cc._decorator;

@ccclass
export default class loading extends cc.Component {

    @property(cc.Sprite)
    par: cc.Sprite = null;

    curPro:number = 0;
    isloading = false;
    timer = 2;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("show loading");
    }

    start () {

    }

    update(dt:any){
        if(this.isloading){
            return;
        }
        // this.curPro += dt;

        // this.par.fillRange = this.curPro / 100
    }
}
