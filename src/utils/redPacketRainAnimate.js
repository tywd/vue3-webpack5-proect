/*
 * @Author: tywd
 * @Date: 2022-05-18 17:37:38
 * @LastEditors: tywd
 * @LastEditTime: 2022-05-19 22:12:16
 * @FilePath: /webpack5-vue3/src/utils/redPacketRainAnimate.js
 * @Description: 红包雨动画类封装
 */
import * as PIXI from 'pixi.js'
import gsap from 'gsap/all';
import redbag from 'assets/img/redbag@3x.png'
import redbagStart from 'assets/img/red-packet-start@3x.png'
import redbagGif from 'assets/img/red-packet.gif'
const events = require('events');
const myEmitter = new events.EventEmitter();

// 有关gameCfg 说明
let gameCfgDefault = {
    img: redbag, // 下雨的红包图片
    count: 5, // 红包的数量
    lotteryList: ['久旱逢甘霖', '金榜题名时', '洞房花烛夜', '他乡遇故知'], // 奖品列表
    animations: {
        // 单位统一为 ms
        redPackageFrequency: 300, // 红包生成频率
        countdownTotal: 20000, // 游戏时长
        redPackageDuration: 10000, // 红包坠落时长
        redPackageEaseOut: 200, // 红包消失动画时长
    }
}

/**
 * @Descripttion: 红包雨类
 * constructor 
 * @params container {dom} dom容器
 * @params gameCfg {object} 有关该游戏的一些配置
 * @return {*}
 */
let activeRedPacketRainApp = null;
let jsonArr = [{
    "name": "redbag",
    "url": redbag
}, {
    "name": "redbagStart",
    "url": redbagStart
}, {
    "name": "redbagGif",
    "url": redbagGif
}]
let loaders = new PIXI.Loader();
loaders.add(jsonArr)
class RedPacketRainApp {
    constructor(container, gameCfg, fn) {
        // super();
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true, // default: false 反锯齿
            autoDensity: true, // canvas视图的CSS尺寸是否应自动调整为屏幕尺寸。
            resolution: 2, // default: 1 分辨率
            backgroundColor: 0x000000,
            backgroundAlpha: 0.5,
            // backgroundColor: 0xffffff,
        });
        this.container = container;
        gameCfgDefault = gameCfg || gameCfgDefault; // 未传入游戏配置则使用默认的
        this._fn = fn; // 回调，红包雨结束的回调方法
        this.count = 0; // 记录已经创建的红包数量
        this.redPkgTimer = null; // 生成红包的频率计时器，创建完一定数量则结束
        this.redPkgRainTimer = null; // 红包雨总的时间计时器，时间一到则清除
        this.redPkgRainTimeCount = gameCfgDefault.animations.countdownTotal; // 当前红包雨已经下了多长时间
    }
    // 开始游戏
    start() {
        // 挂载到DOM 上
        if (this.container) {
            this.container.appendChild(this.app.view);
        }
        activeRedPacketRainApp = this.app;
        myEmitter.on('createEnd', (redPacket) => {
            redPacket.drop();
        })
        this.redPkgTimer = setInterval(() => {
            if (this.count === gameCfgDefault.count) {
                clearInterval(this.redPkgTimer)
            } else {
                this.createRedPkg()
                this.count++
            }
        }, gameCfgDefault.animations.redPackageFrequency);
        this.redPkgRainTimer = setInterval(() => {
            if (this.redPkgRainTimeCount === 0) {
                this.destroy() // 一旦时间一到不管是否有未下完的红包，全部结束
            } else {
                this.redPkgRainTimeCount -= 1000;
            }
        }, 1000)
    }

    createRedPkg() {
        let redpacket = new RedPacket()
        redpacket.create((element) => {
            this.app.stage.addChild(element); // 添加进容器
            myEmitter.emit('createEnd', redpacket); // 红包绘制成功通知
        })
    }

    // 销毁 pixi 容器 、 销毁所有 pixi 元素
    destroy() {
        clearInterval(this.redPkgRainTimer)
        // 销毁所有 pixi 元素
        let i = this.app.stage.children.length;
        while (i > 0) {
            this.app.stage.removeChild(this.app.stage.children[i - 1]);
            i--;
        }

        // 销毁 pixi 容器
        if (this.app) {
            this.app.destroy(true);
            this._fn('tywd')
        }
    }
}

class DropBase {
    constructor() {
        this.element = null
    }
    drop() {
        this.animateY();
        this.animateX();
    }
    animateX() {
        const initX = this.element.x
        // 起始位置是 位置左偏移X 10
        const from = {
            x: Math.max(0, initX - 10),
        };
        // 结束位置是 位置右偏移X 10
        const to = {
            x: Math.min(initX + 10, window.innerWidth),
        };
        // gasp 配置
        const option = {
            duration: 2,
            repeat: -1, // 左右横移动画应该是重复的，而不是执行一次就结束了，所以这里设置 repeat =  -1，表示为无限循环
            yoyo: true, // 类似于 css 中的  animation-direction:alternate 使动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
            ease: 'power1.inOut',
        };
        // 左右随机一下，以免都是同一个方向的偏移
        if (Math.random() > 0.5) {
            gsap.fromTo(this.element, from, {
                ...to,
                ...option,
            });
        } else {
            gsap.fromTo(this.element, to, {
                ...from,
                ...option,
            });
        }
    }
    animateY() {
        let duration = gameCfgDefault.animations.redPackageDuration / 1000
        gsap.to(this.element, {
            y: window.innerHeight + this.element.height, // 坠落的总高度等屏幕高度 + 红包高度
            duration, // 坠落的时间，前面抽离出来的配置
            ease: 'none',
            onComplete: () => {
                // activeRedPacketRainApp.stage.removeChild(this.element); // 坠落超出屏幕可是区域则从容器里清除
            },
        });
    }
}

// 负责红包具体的绘制细节，销毁，监听点击，具体看下面的讲解
class RedPacket extends DropBase {
    constructor() {
        super();
        this.element = null;
        this.w = window.innerWidth * 0.1;
        this.redpacketCount = Math.floor(window.innerWidth / this.w) // 根据红包宽高比，确定一屏宽度能放多少个红包，就按这样排放，超过的红包数量就重叠放
        this.initPositions = [] // 红包初始坐标数组 [[x, y]]
        for (let index = 0; index < this.redpacketCount; index++) {
            this.initPositions.push([this.w * index, 0])
        }
    }

    // 创建单个红包
    create(cb) {
        // this.element = new PIXI.Sprite.from(redbag) // 直接载入元素
        loaders.load((e) => {
            this.element = new PIXI.Sprite(PIXI.utils.TextureCache.redbag) // 利用上面先loader 缓存后的资源来进行载入元素
            this.w = window.innerWidth * 0.1;
            // 57 / 75
            this.element.width = this.w;
            this.element.height = this.w * 75 / 57;
            this.element.anchor.set(0.5); // 设置起始位置在屏幕视口可见之外，即在屏幕最上方，一开始看不见，设置0.5，则可看见一半
            this.setInitPos()
            // 监听每个红包的点击事件
            this.element.interactive = true; // 设置有交互性，默认为flase
            this.element.on('pointerdown', (e) => {
                this.onClick(e);
            });
            // 添加进容器
            cb(this.element)
        })

        /* let elapsed = 0.0;
        // Tell our application's ticker to run a new callback every frame, passing
        // in the amount of time that has passed since the last tick
        this.app.ticker.add((delta) => {
            // Add the time to our total elapsed time
            elapsed += delta;
            // Update the sprite's X position based on the cosine of our elapsed time.  We divide
            // by 50 to slow the animation down a bit...
            this.element.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
        }); */
    }

    // 设置红包随机初始坐标
    setInitPos() {
        const [x, y] = this.getRandomPosition();
        // this.element.x = x;
        // this.element.y = y;
        this.element.position.set(x, y)
    }

    // 获取红包随机坐标 return [x, y]
    getRandomPosition() {
        const randomNum = Math.random() * this.initPositions.length
        return this.initPositions[Math.floor(randomNum)];
    }

    // 红包点击
    onClick(e) {
        console.log('e: ', e);
        let x = e.currentTarget.x;
        let y = e.currentTarget.y;
        createOpenPacket(x, y, (element) => {
            // console.log('activeRedPacketRainApp.stage.children: ', Array.isArray(activeRedPacketRainApp.stage.children), activeRedPacketRainApp.stage.children.__proto__);
            let index = undefined;
            let childrens = activeRedPacketRainApp.stage.children
            index = Array.prototype.findIndex.call(childrens, (element) => element == e.currentTarget)
            // sprite.texture
            // 点击红包切换图片并做消失动画
            childrens[index].texture = loaders.resources.redbagStart.texture;
            setTimeout(() => {
                this.destry(e.currentTarget)
            }, 500)
        })
    }

    // 销毁红包
    destry(element) {
        activeRedPacketRainApp.stage.removeChild(element); // 红包被点击即销毁
    }
}

function createOpenPacket(x, y, cb) {
    let element = PIXI.Sprite.from(redbagStart); // 创建元素
    // 57 / 75
    let w = window.innerWidth * 0.1;
    element.width = w;
    element.height = w * 75 / 57;
    element.anchor.set(1); // 设置起始位置在屏幕视口可见之外，即在屏幕最上方，一开始看不见，设置0.5，则可看见一半
    element.position.set(x, y)
    // 添加进容器
    cb(element)
}

export default RedPacketRainApp