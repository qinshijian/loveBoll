import { EventIDS } from "./event/EvenID";
import EventDispath from "./event/Event";
import { utils } from "./utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class signItem extends cc.Component {

    @property(cc.Label)
    count: cc.Label = null;

    @property(cc.Sprite)
    day: cc.Sprite = null;

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Node)
    select: cc.Node = null;

    isReward:boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
         //投食
         this.node.on(cc.Node.EventType.TOUCH_END, () => {
            if(!this.isReward){
                console.log("点击");
            }
        }, this)
        utils.btnEffect1(this.node)
    }

    start () {

    }

    setData(data){
        if(!data){
            return;
        }
        this.count.string = data.count;

        let url = "sign/login_" + data.day;
        this.updatePicSprite(this.day,url)

        
    }

    onSign(){
        this.node.destroy();
    }

    
    updatePicSprite(iconImg, url) {
        utils.loadSpriteFrame(url, function (spriteFrame) {
            iconImg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }.bind(this))
    }
}
