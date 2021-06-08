import { utils } from "./utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class skinItem extends cc.Component {

    @property(cc.Sprite)
    skin: cc.Sprite = null;

    @property(cc.Node)
    select: cc.Node = null;

    @property(cc.Node)
    eye: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }

    start () {

    }

    // type 存在显示女生 showType 剪影 1显示剪影 2显示正常
    setData(data,showType,type?:any){
        if(data < 0){
            return;
        }

        if(showType == 1){
            this.eye.active = false;
            let surl = "skinIcon/outline_boy_skin"+(data+1);
            if(type){
                surl = "skinIcon/outline_girl_skin"+(data+1);
            }
            utils.loadSpriteFrame(surl,function(res){
                this.skin.spriteFrame = res;
            }.bind(this));
        }else{
            this.eye.active = true;
            let url = "skinIcon/boy_skin"+(data+1);
            if(type){
                url = "skinIcon/girl_skin"+(data+1);
            }
           
            utils.loadSpriteFrame(url,function(res){
                this.skin.spriteFrame = res;
            }.bind(this));
    
            let a = "skinIcon/boy_skin_eye";
            if(data == 1){
                if(type){a = "skinIcon/girl_skin2_eye";}
                else{a = "skinIcon/boy_skin2_eye";}
            }else{
                if(type){a = "skinIcon/girl_skin_eye";}
                else{a = "skinIcon/boy_skin_eye";}
            }
            utils.loadSpriteFrame(a,function(res){
                this.eye.getComponent(cc.Sprite).spriteFrame = res;
            }.bind(this));
        }
    }

    setSelect(){
        this.select.active = true;
    }
}
