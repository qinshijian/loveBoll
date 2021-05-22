const { ccclass } =cc._decorator;

@ccclass('utils')
export class utils  { 
    
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
}