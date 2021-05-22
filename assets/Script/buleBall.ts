
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
        // let self = selfCollider.node.name;
        let other = otherCollider.node.name;
        if(other == 'pink'){
            console.log('win');
        }else{
            console.log('lose');
        }
    }

    // update (dt) {}
}
