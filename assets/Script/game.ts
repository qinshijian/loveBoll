import { EventIDS } from "./event/EvenID";
import EventDispath from "./event/Event";
import uiManger from "./uiManger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class game extends cc.Component {

    @property(cc.RigidBody)  
    blueBall: cc.RigidBody = null;  //蓝色小球

    @property(cc.RigidBody)
    pinkBall: cc.RigidBody = null; //粉色小球（目标）

    @property(cc.Prefab)
    pointPrefab = null;

    @property(cc.Node)
    line = null;

    enemyPool:any;  //轨迹点对象池
    moveInterval = 2; //start点和end相对位置
    // LIFE-CYCLE CALLBACKS:
    touchPos = cc.v2(0, 0);   //点击起始点
    endPos = cc.v2(0, 0);     //移动结束点
    bluePos = cc.v2(0, 0);    //蓝色小球初始位置
    pinkPos = cc.v2(0, 0);    //粉色小球初始位置
    radius = 100;             //绳子的长度
    depth = 1;                //力度
    dir = cc.v2(0, 0);        //蓝色小球拖动的方向
    timeInterval = 0;        //轨迹生成间隔
    list = [];               //轨迹数组
    index = 0;               //轨迹下标

    moveFlag:boolean = false;
    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.blueBall.enabledContactListener = true;
        this.pinkBall.enabledContactListener = true;
        this.bluePos = this.blueBall.node.getPosition();
        this.blueBall.node.zIndex = cc.macro.MAX_ZINDEX;
        this.initTouchEvent();
        this.loadPoint();
        //添加障碍物
        this.addAbstacle(0);
        this.onBind();
    }

    loadPoint(){
        this.enemyPool = new cc.NodePool();
        //预加载
        let initCount = 10;
        for (let i = 0; i < initCount; ++i) {
            let enemy = cc.instantiate(this.pointPrefab); // 创建节点
            this.enemyPool.put(enemy); // 通过 put 接口放入对象池
        }
    }
    onBind(){
        EventDispath.getInstance().addEventListener(EventIDS.CMD_RET_BALL_STATU, this.retBallStasu, this)
    }

    removeListener(){
        EventDispath.getInstance().removeEventListeners(this);
    }

    retBallStasu(){
        for (let i = this.node.children.length -1 ; i>= 0;i--) {
            let element = this.node.children[i];
            if(element.name == "enemy"){
                element.removeFromParent();
            }
        }
        this.blueBall.node.setPosition(this.bluePos);
        this.moveFlag = false;
        this.index = 0;
        this.blueBall.linearVelocity = cc.v2(0,0);
        this.blueBall.gravityScale = 0;
        this.clearPool();
        cc.director.getPhysicsManager().enabled = true;
        this.loadPoint();
    }

    //添加障碍物
    addAbstacle(level:number){
        uiManger.getInstance().levelType(this.node,level);
    }

    initTouchEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStartEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndEvent, this);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStartEvent, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMoveEvent, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEndEvent, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancleEvent, this);
    }

    touchStartEvent(event) {
        this.touchPos = event.getLocation();
    }

    touchMoveEvent(event) {
        if (this.touchPos == event.getLocation()) {
            return;
        }
        this.endPos = event.getLocation();

        let pos = this.endPos.subtract(this.touchPos);
        let s = pos.mag();
        if (s > this.radius) {
            pos.x = pos.x * this.radius / s
            pos.y = pos.y * this.radius / s
            s = this.radius;
            this.depth = 5;
        }
        if(s > 80 && s < this.radius){
            this.depth = 4
        }else if(s > 60 && s <= 80){
            this.depth = 3
        }else if(s > 40 && s <= 60){
            this.depth = 2.5
        }else if(s > 20 && s <= 40){
            this.depth = 2
        }
        this.blueBall.node.setPosition(this.bluePos.add(pos));

        //利用三角函数算出方向
        this.dir.x = pos.x / s //sin = 对边/斜边
        this.dir.y = pos.y / s //cos = 领边/斜边
        //radiansToDegrees弧度转角度。atan2返回从 x 轴到点 (x,y) 之间的角度 Math.atan2(y,x)，结果为弧度
        this.line.rotation = -90-cc.misc.radiansToDegrees(Math.atan2(this.dir.y,this.dir.x));
        this.line.setContentSize(8,s);
    }

    touchEndEvent(event) {
        //是否只点击不移动
        let off = event.getLocation().subtract(this.touchPos).mag();
        if(this.moveInterval  > off){
            return
        }
        //设置初始位置
        this.line.setContentSize(8,1);
        //设置速度
        this.blueBall.linearVelocity = cc.v2(-110*this.depth*this.dir.x,-110*this.depth*this.dir.y);
        this.blueBall.gravityScale = 1
        this.moveFlag = true;
    }

    touchCancleEvent() {
        
    }

    //游戏结束 清除对象池资源
    clearPool(){
        this.enemyPool.clear();
        for (var i = this.list.length-1;i >= 0 ;i--) {
            this.list.splice(i,1);
        }
    }

    //设置两个小球的生成点位置 
    setBallPos(level,posInfo){
        this.bluePos = posInfo.bluePos;
        this.pinkPos = posInfo.pinkPos;
    }

    //生成轨迹点node
    createPoint(call){
        let enemy = null;
        if (this.enemyPool.size() > 0) { 
            enemy = this.enemyPool.get();
        } else { 
            enemy = cc.instantiate(this.pointPrefab);
        }
        enemy.parent = this.node;
        enemy.name = "enemy";
        enemy.active = false;
        this.list.push(enemy);
        if(call){call();}
    }

    update (dt) {
        if(this.moveFlag){
            this.timeInterval += dt;
            if(this.timeInterval >= 0.06){
                this.timeInterval = 0;
                this.index++;
                if(this.index > 100){
                    this.moveFlag = false;
                    return
                }

                this.createPoint(function(){
                    if(this.index < this.list.length){
                        this.list[this.index].active = true;
                        this.list[this.index].setPosition(this.blueBall.node.getPosition());
                    }else{
                        this.createPoint();
                    }
                }.bind(this)); 
            }
        }
    }
}
