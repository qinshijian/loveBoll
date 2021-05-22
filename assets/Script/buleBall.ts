import uiManger from "./uiManger";

const {ccclass, property} = cc._decorator;

@ccclass
export default class buleBall extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {

    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact:any, selfCollider:any, otherCollider:any) {
        let other = otherCollider.node.name;
        if(other == 'pink'){
            //停止蓝色小球刚体动态
            cc.director.getPhysicsManager().enabled = false;
            this.showResult();
        }else{
            console.log('lose');
        }
    }

    showResult(){
        uiManger.getInstance().resultLayer(cc.director.getScene(),1);
    }
    // update (dt) {}
}
