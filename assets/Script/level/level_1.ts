import uiManger from "../uiManger";

const {ccclass, property} = cc._decorator;

@ccclass
export default class level_1 extends cc.Component {

    @property(cc.Node)
    move: cc.Node = null;

    onLoad () {
        //障碍物移动
        this.initMoveAni()
    }

    initMoveAni(){
        this.move.setPosition(0,-150);
        //中间有一条水平短（150像素）障碍物左右匀速（40像素/s）滑动，
        let move1 = cc.moveTo(1.875,cc.v2(150,-150));
        let move2 = cc.moveTo(1.875,cc.v2(0,-150));
        let move3 = cc.moveTo(1.875,cc.v2(-150,-150));
        let seq = cc.sequence(move1,move2,move3,move2).repeatForever();
        this.move.runAction(seq);
    }

    start () {

    }
}
