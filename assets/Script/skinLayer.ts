import uiManger from "./uiManger";
import { utils } from "./utils";


const {ccclass, property} = cc._decorator;

@ccclass
export default class skinLayer extends cc.Component {

    @property(cc.ScrollView)
    scrollView1: cc.ScrollView = null;

    @property(cc.ScrollView)
    scrollView2: cc.ScrollView = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    @property(cc.Node)
    public selectNode: Array<cc.Node> = [];

    @property(cc.SpriteFrame)
    public select_0: Array<cc.SpriteFrame> = [];

    @property(cc.SpriteFrame)
    public select_1: Array<cc.SpriteFrame> = [];

    @property(cc.Node)
    close: cc.Node = null;

    @property(cc.Node)
    rdLock: cc.Node = null; //随机解锁

    @property(cc.Node)
    lookvd: cc.Node = null; //看广告
    
    // LIFE-CYCLE CALLBACKS:
    cardSize = cc.size(146, 148);
    spaceX = 40;
    spaceY = 38;

    selectIndex = -1;

    growthBoy: Array<cc.Node> = [];//数据
    growthGirl: Array<cc.Node> = [];//数据

    growthBoyData: Array<object> = [];//数据
    growthGirlData: Array<object> = [];//数据

    onLoad () {

        for (let i = 0; i < this.selectNode.length; i++) {
            this.selectNode[i].on(cc.Node.EventType.TOUCH_END, () => {
                this.selectCallback(i)
            }, this)
            utils.btnEffect1(this.selectNode[i])
        }
        this.selectCallback(0);

        this.close.on(cc.Node.EventType.TOUCH_END,  () => {
            this.onClose()
        }, this)
        utils.btnEffect1(this.close);

        this.rdLock.on(cc.Node.EventType.TOUCH_END, () => {
            this.onReward()
        }, this)
        utils.btnEffect1(this.rdLock);
    }

    start () {

    }

    selectCallback(index: number) {
        this.selectIndex = index;
        if (index == 0) {
            this.selectNode[0].getComponent(cc.Sprite).spriteFrame = this.select_0[0];
            this.selectNode[1].getComponent(cc.Sprite).spriteFrame = this.select_1[1];
            this.scrollView1.node.active = true;
            this.scrollView2.node.active = false;        
            this.createBoyList();
        } 
        else {
            this.selectNode[0].getComponent(cc.Sprite).spriteFrame = this.select_0[1];
            this.selectNode[1].getComponent(cc.Sprite).spriteFrame = this.select_1[0];
            this.scrollView1.node.active = false;
            this.scrollView2.node.active = true;        
            this.createGirlList();
        }
    }

    createBoyList(){
        let allcount = 7;
        this.scrollView1.content.setContentSize(620, this.getAllHeight(allcount))
        if (this.growthBoy.length > 0) {
            return
        }

        if (allcount > 0) {
            for (let i = 0; i < allcount; i++) {
                let card = cc.instantiate(this.item)
                if (card) {
                    // card.getComponent("shopItem").setData(this.growthShopData[i])
                    this.scrollView1.content.addChild(card);
                    let pos = this.getCardPos(i)
                    card.setPosition(pos.x, pos.y)
                    this.growthBoy.push(card);
                }
            }
        }
    }

    createGirlList(){
        let allcount = 8;
        this.scrollView2.content.setContentSize(620, this.getAllHeight(allcount))
        if (this.growthGirl.length > 0) {
            return
        }

        if (allcount > 0) {
            for (let i = 0; i < allcount; i++) {
                let card = cc.instantiate(this.item)
                if (card) {
                    // card.getComponent("shopItem").setData(this.growthShopData[i])
                    this.scrollView2.content.addChild(card);
                    let pos = this.getCardPos(i)
                    card.setPosition(pos.x, pos.y)
                    this.growthGirl.push(card);
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
        let firstPos = cc.v2(-(this.cardSize.width  + this.spaceX), -this.cardSize.height / 2)
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
