
const {ccclass, property} = cc._decorator;

@ccclass
export default class signLayer extends cc.Component {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("show result");
    }

    start () {

    }

    setData(data){
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
