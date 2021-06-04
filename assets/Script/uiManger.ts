import { utils } from "./utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class uiManger {

    constructor() {

    }

    getStorgeInfo(key){
       return cc.sys.localStorage.getItem(key)
    }

    setStorgeInfo(key,value){
        cc.sys.localStorage.setItem(key,value)
    }
    //签到
    signLayer() {
        let prefabUrl = "prefab/signLayer"
        utils.loadPrefab(prefabUrl, function (prefab: any) {
            if (utils.findNodeByName(cc.director.getScene(), "signLayer")) { return }
            let node = cc.instantiate(prefab)
            node.setPosition(cc.winSize.width/2, cc.winSize.height/2)
            cc.director.getScene().addChild(node, 200)
        }.bind(this))
    }

    //开始游戏界面
    startLayer(basenode: any,callback?:any) {
        let prefabUrl = "prefab/start"
        utils.loadPrefab(prefabUrl, function (prefab: any) {
            if (utils.findNodeByName(cc.director.getScene(), "start")) { return }
            let node = cc.instantiate(prefab)
            node.getComponent("startLayer").setData(callback);
            node.setPosition(cc.winSize.width/2, cc.winSize.height/2)
            cc.director.getScene().addChild(node, 200)
        }.bind(this))
    }

      //引导界面
      guideLayer() {
        let prefabUrl = "prefab/guideLayer"
        utils.loadPrefab(prefabUrl, function (prefab: any) {
            if (utils.findNodeByName(cc.director.getScene(), "guideLayer")) { return }
            let node = cc.instantiate(prefab)
            node.setPosition(cc.winSize.width/2, cc.winSize.height/2)
            cc.director.getScene().addChild(node, 200)
        }.bind(this))
    }

     //loading界面
     loadingLayer() {
        let prefabUrl = "prefab/loading"
        utils.loadPrefab(prefabUrl, function (prefab: any) {
            if (utils.findNodeByName(cc.director.getScene(), "loading")) { return }
            let node = cc.instantiate(prefab)
            node.setPosition(cc.winSize.width/2, cc.winSize.height/2)
            cc.director.getScene().addChild(node, 300)
        }.bind(this))
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

