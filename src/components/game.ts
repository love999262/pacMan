import utils from './utils';
import Map from './map';
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
    map: Map;
    constructor(configuration?: GameInterface) {
        const defaultConfig = {
            selector: '#app',
            width: 500,
            height: 500,
            bgColor: '#000',
            borderColor: '#fff',
            snakeColor: '#68c867',
            snakeSize: 10,
            snakeSpeed: 100,
        }
        const config = (<any>Object).assign(defaultConfig, configuration);
        this.createCanvas(config);
        const snakeConfig = (<any>Object).assign({}, config, { ctx: this.ctx });
        const mapConfig = (<any>Object).assign({}, config, { ctx: this.ctx });
        this.snake = new Snake(snakeConfig);
        this.map = new Map(mapConfig);
        this.bind();
    }
    private bind() {
        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            switch (e.keyCode) {
                case 38:
                    // 上
                    this.snake.setDirection(Direction.Up);
                    break;
                case 40:
                    // 下
                    this.snake.setDirection(Direction.Down);
                    break;
                case 37:
                    // 左
                    this.snake.setDirection(Direction.Left);
                    break;
                case 39:
                    // 右
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
        ctx.fillStyle = config.bgColor;
        ctx.strokeStyle = config.borderColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'butt';
        ctx.strokeRect(0, 0, w, h);
        ctx.fillRect(0, 0, w, h);
        selector[0].appendChild(canvas);
    }

}

export default Game;
export { GameInterface, Direction };