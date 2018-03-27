import utils from './utils';
import Game, { GameInterface, Direction } from './game';

interface SnakeInterface extends GameInterface {
    ctx: CanvasRenderingContext2D;
    cellX: number;
    cellY: number;
}

interface SnakeBodyInterface {
    x: number;
    y: number;
}

class Snake {
    config: SnakeInterface;
    nextDir: Direction;
    direction: Direction = this.nextDir;
    speedBase: number = 5000;
    snakeBody: SnakeBodyInterface[] = []; // 以一维数组的形式存储蛇的信息,只需要关注蛇头信息,其他信息由方向推导
    private initialX: number;
    private initialY: number;
    private snakeLength: number = 5; // 初始化的length
    constructor(config: SnakeInterface) {
        this.config = config;
        const initalPos = this.getinitalPos(10); // 初始化位置与周边保留一定安全距离
        this.initialX = initalPos.x;
        this.initialY = initalPos.y;
        const initDir = Math.ceil(4 * Math.random());
        this.setDirection(initDir);
        switch (initDir) {
            case Direction.Up:
                this.initialY--;
                break;
            case Direction.Down:
                this.initialY++;
                break;
            case Direction.Left:
                this.initialX--;
                break;
            case Direction.Right:
                this.initialX++;
                break;
        }
        for (let i = 0; i < this.snakeLength; i++) {
            this.snakeBody.push({
                x: this.initialX,
                y: this.initialY,
            });
        }

    }
    private getinitalPos(safaDistance: number = 10) {
        const initalPos = utils.getRandomPoint(this.config.cellX, this.config.cellY);
        console.log(initalPos);
        if ((initalPos.x <= safaDistance || (this.config.cellX - initalPos.x) <= safaDistance) || (initalPos.y <= safaDistance || (this.config.cellY - initalPos.y) <= safaDistance)) {
            this.getinitalPos(safaDistance);
        }
        return initalPos;
    }
    growup() {
        this.snakeBody.length++;
    }
    snakeMove() {
        const config = this.config;
        utils.refreshMap({
            ctx: config.ctx,
            bgColor: config.bgColor,
            borderColor: config.borderColor,
            width: config.width,
            height: config.height,
        });
        let x = this.snakeBody[0].x;
        let y = this.snakeBody[0].y;
        switch (this.nextDir) {
            case Direction.Up:
                y--;
                break;
            case Direction.Down:
                y++;
                break;
            case Direction.Left:
                x--;
                break;
            case Direction.Right:
                x++;
                break;
        }
        this.snakeBody.pop();
        this.snakeBody.unshift({
            x: x,
            y: y,
        });
        for (let i = 0; i < this.snakeBody.length; i++) {
            utils.createPoint({
                x: this.snakeBody[i].x,
                y: this.snakeBody[i].y,
                ctx: config.ctx,
                size: config.snakeSize,
                color: config.snakeColor,
            });
        }
        if (this.isKonckWall()) {
            return false;
        }
        if(this.isKonckSelf()) {
            return false;
        }
        return true;
    }
    isKonckWall() {
        if (this.snakeBody[0].x < 0 || this.snakeBody[0].x > this.config.cellX || this.snakeBody[0].y < 0 || this.snakeBody[0].y > this.config.cellY) {
            console.log('Game Over!');
            return true;
        }
    }
    isKonckSelf() {
        for (let i = 1; i < this.snakeBody.length; i++) {
            if (this.snakeBody[0].x === this.snakeBody[i].x && this.snakeBody[0].y === this.snakeBody[i].y) {
                console.log('commit suicide');
                return true;
            }
        }
    }
    setDirection(direction: Direction) {
        // 上: 38 -> 1 下: 40 -> 2 左: 37 -> 3 右: 39 -> 4
        this.nextDir = this.direction = direction;
    }
}

export default Snake;
