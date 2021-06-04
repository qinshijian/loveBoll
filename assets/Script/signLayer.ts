import uiManger from "./uiManger";
import { utils } from "./utils";


const {ccclass, property} = cc._decorator;

@ccclass
export default class signLayer extends cc.Component {

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    @property(cc.Node)
    close: cc.Node = null;

    @property(cc.Node)
    selectStau: cc.Node = null;

    @property(cc.Node)
    reward: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    groupArr = [];//将node添加到数组里

    cardSize = cc.size(178, 183);
    spaceX = 20;
    spaceY = 26;


    onLoad () {
        this.createSignList(function(){
            let a = uiManger.getInstance().getStorgeInfo("loveBall_day");
            if(a){
                for (let i = 0; i < Number(a); i++) {
                    var element = this.groupArr[i];
                    if(element){
                        element.getComponent("signItem").setSelect();
                    }
                }
            }
        }.bind(this));

        this.close.on(cc.Node.EventType.TOUCH_END,  () => {
            this.onClose()
        }, this)
        utils.btnEffect1(this.close);

        this.reward.on(cc.Node.EventType.TOUCH_END, () => {
            this.onReward()
        }, this)
        utils.btnEffect1(this.reward);
    }

    start () {

    }

     createSignList(callback:any) {
        let allcount = 7;
        if(!allcount || allcount == null || allcount == 0){
            return
        }

        this.scrollView.content.setContentSize(600, this.getAllHeight(allcount))
        for (let i = 0; i < allcount; i++) {
            let card = cc.instantiate(this.item)
            if (card) {
                card.getComponent("signItem").setData(i)
                this.scrollView.content.addChild(card)
                let pos = this.getCardPos(i)
                card.setPosition(pos.x, pos.y);
                this.groupArr.push(card);
                if(this.groupArr.length == 7){
                    if(callback){
                        callback();
                    }
                    return
                }
            }
        }
    }

    getAllHeight(count: number) {
        let allcount = count;
        let allRow = Math.ceil(allcount / 3)
        let height = allRow * (this.cardSize.height + this.spaceY) - this.spaceY + 10;
        return height;
    }

    getCardPos(count: number) {
        let firstPos = cc.v2(-(this.cardSize.width  + this.spaceX + 90), -this.cardSize.height / 2)
        let row1 = Math.floor(count / 3)
        let col = count % 3

        return cc.v2(firstPos.x + col * (this.cardSize.width + this.spaceX), firstPos.y - row1 * (this.cardSize.height + this.spaceY));
    }

    onClose(){
        this.node.destroy();
    }

    onReward(){
        //保存到本地，更新天数
        let a = uiManger.getInstance().getStorgeInfo("loveBall_day");
        if(a){
            if(Number(a) == 6){
                uiManger.getInstance().setStorgeInfo("loveBall_day",0);
            }else{
                uiManger.getInstance().setStorgeInfo("loveBall_day",Number(a)+1);
            }
        }else{
            uiManger.getInstance().setStorgeInfo("loveBall_day",1);
        }
        uiManger.getInstance().setStorgeInfo("loveBall_isSign",utils.getCurtDate());
        this.onClose();
    }
}
