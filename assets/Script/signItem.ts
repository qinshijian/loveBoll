import { utils } from "./utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class signItem extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Sprite)
    day: cc.Sprite = null;

    @property(cc.Label)
    count: cc.Label = null;

    @property(cc.Node)
    selectNode: cc.Node = null;

    @property(cc.Node)
    lyout: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("show result");
    }

    start () {

    }

    setData(data){
        // if(!data){
        //     return
        // }

        console.log(data);

        let url = "sign/login_"+(data+1);
        utils.loadSpriteFrame(url,function(res){
            this.day.spriteFrame = res;
        }.bind(this));

        if(data == 6){
            utils.loadSpriteFrame("sign/loginBg_2",function(res){
                this.bg.spriteFrame = res;
            }.bind(this));

            this.lyout.setPosition(289,0);
        }
    }
}
