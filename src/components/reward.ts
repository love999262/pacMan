import Game, { GameInterface, Direction } from './game';
import utils from './utils';
import Snake from './snake';

interface MapInterface extends GameInterface {
    ctx: CanvasRenderingContext2D;
    cellX: number;
    cellY: number;
    snake: Snake;
}
interface RewardPosInterface {
    x: number;
    y: number;
}
class Map {
    config: MapInterface;
    rewardPos: RewardPosInterface;
    constructor(config: MapInterface) {
        this.config = config;
        this.rewardPos = utils.getRandomPoint(this.config.cellX, this.config.cellY);
    }
    getRewardPoint() {
        return this.rewardPos;
    }
    refreshReward() {
        const config = this.config;
        this.rewardPos = utils.getRandomPoint(this.config.cellX, this.config.cellY);
        config.snake.snakeBody.forEach((item) => {
            if (item.x === this.rewardPos.x && item.y === this.rewardPos.y) {
                this.refreshReward();
                return false;
            }
        });
        return this.rewardPos;
    }
}

export default Map;
