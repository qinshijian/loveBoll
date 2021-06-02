import uiManger from "./uiManger";
import { utils } from "./utils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class startLayer extends cc.Component {
    @property(cc.Node)
    startBtn: cc.Node = null;

    @property(cc.Sprite)
    soundBtn: cc.Sprite = null;

    statuType = "0"; //默认选择开启声音
    callback:any; //开始游戏回调
    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        this.startBtn.on(cc.Node.EventType.TOUCH_END, () => {
            this.onClose()
        }, this)
        utils.btnEffect1(this.startBtn);

        this.soundBtn.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.onSound()
        }, this)
        utils.btnEffect1(this.startBtn);


        let a = uiManger.getInstance().getStorgeInfo("loveball_sound");
        console.log("sound = ",a);
        if( a == "1"){
            this.statuType = a;
        }else{
            this.statuType = "0";
        }
        this.updateIcon(this.statuType);
    }

    start() {

    }

    setData(callback?:any){
        if(callback){
            this.callback = callback;
        }
    }
    onSound() {
        if (this.statuType == "0") {
            //关闭音效
            this.updateIcon(1);
            uiManger.getInstance().setStorgeInfo("loveball_sound", 1);
            console.log("关闭音乐");
        } else {
            this.updateIcon(0);
            uiManger.getInstance().setStorgeInfo("loveball_sound", 0);
            console.log("开启音乐");
        }
    }

    updateIcon(type) {
        this.statuType = type;
        utils.loadSpriteFrame("start/sound_" + type, function (res) {
            this.soundBtn.spriteFrame = res;
        }.bind(this));
    }

    onClose() {
        if(this.callback){
            this.callback();
        }
        this.node.destroy();
    }
}
