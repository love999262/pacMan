import utils from './utils';
import { GameInterface, Direction } from './game';

interface SnakeInterface extends GameInterface {
    ctx: CanvasRenderingContext2D;
}

interface SnakeBodyInterface {
    pos: {
        x: number;
        y: number;
    }
}

class Snake {
    config: SnakeInterface;
    private nextDir: Direction;
    private direction: Direction = this.nextDir;
    private initialX: number;
    private initialY: number;
    private stepX: number;
    private stepY: number;
    private speedBase: number = 5000;
    private snakeLength: number = 5;
    constructor(config: SnakeInterface) {
        this.config = config;
        this.initialX = utils.getRandomPosition(config.width, config.height).x;
        this.initialY = utils.getRandomPosition(config.width, config.height).y;
        this.stepX = this.initialX;
        this.stepY = this.initialY;
        this.createSnake({
            pos: {
                x: this.initialX,
                y: this.initialY,
            }
        });
        const interval = () => {
            setTimeout(() => {
                if (!this.snakeMove()) {
                    // 如果到达边界就终止循环, game over
                    return;
                }
                setTimeout(() => {
                    interval();
                }, this.speedBase / config.snakeSpeed);
            }, this.speedBase / config.snakeSpeed);
        }
        interval();
        this.setDirection(3);
    }
    createSnake(o: SnakeBodyInterface) {
        const config = this.config;
        const pos = o.pos;
        const ctx = config.ctx;
        const color = config.snakeColor;
        ctx.fillStyle = color;
        for (let i = 0; i < this.snakeLength; i++) {
            switch (this.direction) {
                case Direction.Up:
                    pos.y++;
                    break;
                case Direction.Down:
                    pos.y--;
                    break;
                case Direction.Left:
                    pos.x++;
                    break;
                case Direction.Right:
                    pos.x--;
                    break;
            }
            ctx.fillRect(pos.x, pos.y, config.snakeSize, config.snakeSize);
        }
    }
    clearSnake(o: SnakeBodyInterface) {
        const config = this.config;
        const pos = o.pos;
        const ctx = this.config.ctx;
        ctx.clearRect(pos.x, pos.y, config.snakeSize, config.snakeSize);
    }
    snakeMove() {
        // if (this.direction !== this.nextDir) {
        // }
        const config = this.config;
        config.ctx.beginPath();
        config.ctx.fillStyle = config.bgColor;
        config.ctx.strokeStyle = config.borderColor;
        config.ctx.fillRect(0, 0, config.width, config.height);

        switch (this.nextDir) {
            case Direction.Up:
                this.stepY--;
                break;
            case Direction.Down:
                this.stepY++;
                break;
            case Direction.Left:
                this.stepX--;
                break;
            case Direction.Right:
                this.stepX++;
                break;
        }
        if (this.stepX >= (config.width - config.snakeSize) || this.stepY >= (config.height - config.snakeSize) || this.stepX < 0 || this.stepY < 0) {
            // alert('您已到达边界!');
            return false;
        }

        this.createSnake({
            pos: {
                x: this.stepX,
                y: this.stepY,
            }
        });

        return true;
    }
    setDirection(direction: Direction) {
        // 上: 38 -> 1 下: 40 -> 2 左: 37 -> 3 右: 39 -> 4
        this.nextDir = direction;
        this.direction = this.nextDir;
    }
}

export default Snake;
