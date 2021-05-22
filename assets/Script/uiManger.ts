import { utils } from "./utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class uiManger {

    constructor() {

    }

    //结算
    resultLayer(basenode: any, data: any) {
        let prefabUrl = "prefab/result"
        utils.loadPrefab(prefabUrl, function (prefab: any) {
            if (utils.findNodeByName(basenode, "result")) { return }
            let node = cc.instantiate(prefab)
            node.setPosition(cc.winSize.width/2, cc.winSize.height/2)
            node.getComponent("result").setData(data);
            basenode.addChild(node, 200)
        }.bind(this))
    }

    //障碍物
    levelType(basenode: any, level: any) {
        let name = "level_"+level;
        let prefabUrl = "level/"+name;
        utils.loadPrefab(prefabUrl, function (prefab: any) {
            if (utils.findNodeByName(basenode, name)) { return }
            let node = cc.instantiate(prefab)
            node.setPosition(0,0)
            basenode.addChild(node)
        }.bind(this))
    }
    
    public static singleton: uiManger
    public static getInstance(): uiManger {
        if (!this.singleton) {
            this.singleton = new uiManger()
        }
        return this.singleton
    }

}

