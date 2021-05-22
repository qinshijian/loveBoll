
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
        cc.director.getPhysicsManager().enabled = true;
    }

    onNext(){
        this.node.removeFromParent();
        cc.director.getPhysicsManager().enabled = true;
    }
}
