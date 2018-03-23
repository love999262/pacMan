import { GameInterface } from './game';
import utils from './utils';

interface MapInterface extends GameInterface {
    ctx: CanvasRenderingContext2D;
}

class Map {
    constructor(config: MapInterface) {
        
    }
    getRewardPosition() {

    }
    refreshMap() {

    }
}

export default Map;
