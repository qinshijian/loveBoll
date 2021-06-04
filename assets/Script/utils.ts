const { ccclass } =cc._decorator;

@ccclass('utils')
export class utils extends cc.Component { 
    
    public static loadPrefab(prefabUrl, successCallback: any, failCallback?: any) {
        let prefab = cc.loader.getRes(prefabUrl, cc.Prefab)
        if (prefab && prefab != null) {
            successCallback(prefab)
        } else {
            cc.loader.loadRes(prefabUrl, function (errorMessage, downPrefab) {
                if (errorMessage) {
                    cc.log("load " + prefabUrl + " error : " + errorMessage);
                    if (failCallback) {
                        failCallback()
                    }
                    return;
                }
                successCallback(downPrefab)
            }.bind(this));
        }
    }

    public static loadSpriteFrame(frameUrl, successCallback: any, failCallback?: any) {
        let spriteFrame = cc.loader.getRes(frameUrl, cc.SpriteFrame)
        if (spriteFrame && spriteFrame != null) {
            successCallback(spriteFrame)
        } else {
            cc.loader.loadRes(frameUrl, cc.SpriteFrame, function (err, downSpriteFrame) {
                if (err) {
                    cc.log("load " + frameUrl + " error : " + err);
                    if (failCallback) {
                        failCallback()
                    }
                    return;
                }
                successCallback(downSpriteFrame)
            }.bind(this));
        }
    }

    
    public static findNodeByName(root, name) {
        if (root) {
            let widget = root.getChildByName(name);
            if (widget) {
                return widget
            } else {
                let children = root.children
                for (let c of children) {
                    widget = utils.findNodeByName(c, name)
                    if (widget) {
                        return widget
                    }
                }
                return null
            }
        }
        return null
    }

    //按钮点击缩放，btn为触摸的node，icon为缩放效果node
    public static btnEffect1(btn:cc.Node, icon? :any, scaleX? :number, scaleY? :number) {
        if (!icon) {
            icon = btn
        }

        let preScaleX = btn.scaleX
        let preScaleY = btn.scaleY

        if (scaleX) {
            preScaleX = scaleX;
        }

        if (scaleY) {
            preScaleY = scaleY;
        }

        btn.on(cc.Node.EventType.TOUCH_START, function(e){
            icon.runAction(cc.scaleTo(0.1, preScaleX*1.1, preScaleY*1.1))
        }.bind(btn), btn)

        btn.on(cc.Node.EventType.TOUCH_END, function(e){
            icon.runAction(cc.scaleTo(0.2, preScaleX, preScaleY))
        }.bind(btn), btn)

        btn.on(cc.Node.EventType.TOUCH_CANCEL, function(e){
            icon.runAction(cc.scaleTo(0.2, preScaleX, preScaleY))
        }.bind(btn), btn)
    }


    public static getCurtDate(){
        var date = new Date();
        var Y = date.getFullYear()+"";
        var M = this.add0(date.getMonth()+1);
        var D = this.add0(date.getDate());
        return Y+M+D;
    }

    static add0(m: number) {
        return m < 10 ? '0' + m : m;
    }
}