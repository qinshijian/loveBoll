const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Node)
    // hero: cc.Node = null;

    @property(cc.RigidBody)
    hero: cc.RigidBody = null;

    @property(cc.Prefab)
    pointPrefab = null;

    @property(cc.Node)
    gunNode = null;

    @property(cc.Node)
    line = null;

    // LIFE-CYCLE CALLBACKS:
    touchPos = cc.v2(0, 0);   //点击起始点
    endPos = cc.v2(0, 0);     //移动结束点
    heroPos = cc.v2(0, 0);
    stickPos = cc.v2(0, 0);
    radius = 100;
    g: number = 800;
    dir = cc.v2(0, 0);

    _curAngle = 0;
    gunSchedule = null;
    bulletfun = null;

    xLi: number = 300;

    chongX: number = 0;
    chongY: number = 0;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().gravity = cc.v2(0, -this.g);
        this.heroPos = this.hero.node.getPosition();
        this.initTouchEvent();
    }

    start() {

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
        let startTouchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.stickPos = startTouchPos;

        // this._curAngle = 0;
        // this.chongX = this.xLi;
        // //通过角度计算力度
        // // this.chongY = this.chongX * Math.tan(Math.abs(this._curAngle) * (Math.PI / 180)); 
        // this.gunSchedule = function () {
        //     if (this._curAngle < 90) {
        //         this._curAngle -= 1;
        //     }
        // };
        // this.schedule(this.gunSchedule, 0.02);
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
        }
        //通过角度计算力度
        // this.chongY = this.chongX * Math.tan(Math.abs(this._curAngle) * (Math.PI / 180)); 
        this.hero.node.setPosition(this.heroPos.add(pos));

        //利用三角函数算出方向
        this.dir.x = pos.x / s //sin = 对边/斜边
        this.dir.y = pos.y / s //cos = 领边/斜边
        //radiansToDegrees弧度转角度。atan2返回从 x 轴到点 (x,y) 之间的角度 Math.atan2(y,x)，结果为弧度
        this.line.rotation = -90-cc.misc.radiansToDegrees(Math.atan2(this.dir.y,this.dir.x));
        this.line.setContentSize(8,s);
    }

    touchEndEvent(event) {
        this.hero.node.setPosition(cc.v2(0,100));
        this.dir = cc.v2(0, 0)
        this.line.setContentSize(8,1);
        //设置速度
        // this.hero.linearVelocity = cc.v2(500*this.dir.x,500*this.dir.y);
        // this.hero.applyForceToCenter(cc.v2(this.chongX, this.chongY ), true);
    }

    touchCancleEvent(event) {
        this.hero.node.setPosition(cc.v2(0,100));
        this.dir = cc.v2(0, 0)
    }

    onBind() {
    }

    // TS
    drawLineOfDashes(g: cc.Graphics, from: cc.Vec2, to: cc.Vec2, stroke: boolean = true, length: number = 8, interval: number = 0): void {
        if (g) {
            let off = to.sub(from);
            let dir = off.normalize();
            let dis = off.mag();
            let delta = dir.mul(length + interval);
            let delta1 = dir.mul(length);
            let n = Math.floor(dis / (length + interval));
            for (let i = 0; i < n; ++i) {
                let start = from.add(delta.mul(i));
                g.moveTo(start.x, start.y);
                let end = start.add(delta1);
                g.lineTo(end.x, end.y);
            }
            let start1 = from.add(delta.mul(n));
            g.moveTo(start1.x, start1.y);
            if (length < dis - (length + interval) * n) {
                let end = start1.add(delta1);
                g.lineTo(end.x, end.y);
            } else {
                g.lineTo(to.x, to.y);
            }
            if (stroke) g.stroke();
        }
    }

    // update (dt) {}
}
