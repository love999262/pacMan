import Game, { GameInterface, Direction } from './game';
import utils from './utils';

interface MapInterface extends GameInterface {
    ctx: CanvasRenderingContext2D;
    cellX: number;
    cellY: number;
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
        this.rewardPos = utils.getRandomPoint(this.config.cellX, this.config.cellY);
    }
}

export default Map;
