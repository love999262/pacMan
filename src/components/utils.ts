interface RandomPointInterface {
    x: number;
    y: number;
}
interface PointInterface {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    color: string;
    size: number;
}
interface MapInterface {
    ctx: CanvasRenderingContext2D;
    bgColor: string;
    borderColor: string;
    width: number;
    height: number;
}
const utils = {
    $(selector: string) {
        return document.querySelectorAll(selector);
    },
    getRandomPoint(rangeX: number, rangeY: number): RandomPointInterface {
        const x = Math.floor(Math.random() * rangeX);
        const y = Math.floor(Math.random() * rangeY);
        return {
            x: x,
            y: y,
        }
    },
    createPoint(o: PointInterface) {
        const ctx = o.ctx;
        ctx.fillStyle = o.color;
        ctx.fillRect(o.x * 10, o.y * 10, o.size, o.size);
    },
    refreshMap(o: MapInterface) {
        o.ctx.beginPath();
        o.ctx.fillStyle = o.bgColor;
        o.ctx.strokeStyle = o.borderColor;
        o.ctx.fillRect(0, 0, o.width, o.height);
    }
};

export default utils;