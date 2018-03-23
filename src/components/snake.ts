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
    direction: Direction;
    constructor(config: SnakeInterface) {
        this.config = config;
        this.createSnake({
            pos: {
                x: utils.getRandomPosition(config.width, config.height).x,
                y: utils.getRandomPosition(config.width, config.height).y,
            }
        });
        this.setDirection(1);
    }
    createSnake(o: SnakeBodyInterface) {
        const config = this.config;
        const pos = o.pos;
        const ctx = config.ctx;
        const color = config.snakeColor;
        ctx.fillStyle = color;
        ctx.fillRect(pos.x, pos.y, config.snakeSize, config.snakeSize);
    }
    snakeMove() {
        const config = this.config;
    }
    setDirection(direction: Direction) {
        // 上: 38 下: 40 左: 37 右: 39

    }
}

export default Snake;
