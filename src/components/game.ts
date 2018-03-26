import utils from './utils';
import Reward from './reward';
import Snake from './snake';

interface GameInterface {
    selector?: string; // 选择器名
    width?: number; // 画布宽度
    height?: number; // 画布高度
    bgColor?: string; // 画布背景色
    borderColor?: string; // 画布描边
    snakeColor?: string; // 蛇的颜色
    snakeSize?: number; // 蛇的大小
    snakeSpeed?: number; //蛇的速度 1-10
    rewardColor?: string;
}

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

const $ = utils.$;
class Game {
    ctx: CanvasRenderingContext2D;
    snake: Snake;
    reward: Reward;
    cellX: number; // 以单元格为长度单位而不是XY的值
    cellY: number; // 以单元格为长度单位而不是XY的值
    constructor(configuration?: GameInterface) {
        const defaultConfig = {
            selector: '#app',
            width: 500,
            height: 500,
            bgColor: '#000',
            borderColor: '#dadada',
            snakeColor: '#68c867',
            snakeSize: 10, // 10
            snakeSpeed: 100, // 10 - 1000
            rewardColor: '#dadada',
        }
        const config = (<any>Object).assign(defaultConfig, configuration);
        this.cellX = Math.floor(config.width / 10);
        this.cellY = Math.floor(config.height / 10);
        this.createCanvas(config);
        const snakeConfig = (<any>Object).assign({}, config, { 
            ctx: this.ctx,
            cellX: this.cellX,
            cellY: this.cellY,
        });
        const mapConfig = (<any>Object).assign({}, config, { 
            ctx: this.ctx,
            cellX: this.cellX,
            cellY: this.cellY,
         });
        this.snake = new Snake(snakeConfig);
        this.reward = new Reward(mapConfig);
        this.bind();
        const interval = () => {
            const timer = setTimeout(() => {
                if (!this.snake.snakeMove()) {
                    // Game Over
                    return false;
                }
                utils.createPoint({
                    x: this.reward.getRewardPoint().x,
                    y: this.reward.getRewardPoint().y,
                    ctx: this.ctx,
                    color: config.rewardColor,
                    size: config.snakeSize,
                });
                if (this.snake.snakeBody[0].x === this.reward.getRewardPoint().x && this.snake.snakeBody[0].y === this.reward.getRewardPoint().y) {
                    
                    // this.reward.refreshReward();
                }
                const _timer = setTimeout(() => {
                    interval();
                }, this.snake.speedBase / config.snakeSpeed);
            }, this.snake.speedBase / config.snakeSpeed);
        }
        interval();
    }
    private bind() {
        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            switch (e.keyCode) {
                case 38:
                    // 上
                    if (this.snake.direction === Direction.Down) {
                        return;
                    }
                    this.snake.setDirection(Direction.Up);
                    break;
                case 40:
                    // 下
                    if (this.snake.direction === Direction.Up) {
                        return;
                    }
                    this.snake.setDirection(Direction.Down);
                    break;
                case 37:
                    // 左
                    if (this.snake.direction === Direction.Right) {
                        return;
                    }
                    this.snake.setDirection(Direction.Left);
                    break;
                case 39:
                    // 右
                    if (this.snake.direction === Direction.Left) {
                        return;
                    }
                    this.snake.setDirection(Direction.Right);
                    break;
            }
        });
    }
    private createCanvas(config: GameInterface) {
        const canvas = document.createElement('canvas');
        if (!canvas) {
            return false;
        }
        const w = config.width
        const h = config.height;
        const selector = $(config.selector);
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        this.ctx = ctx;
        ctx.strokeStyle = config.borderColor;
        ctx.fillStyle = config.bgColor;
        ctx.lineWidth = 10;
        ctx.lineCap = 'butt';
        ctx.strokeRect(10, 10, w, h);
        ctx.fillRect(0, 0, w, h);
        selector[0].appendChild(canvas);
    }

}

export default Game;
export { GameInterface, Direction };