interface randomPosiInterface {
    x: number;
    y: number;
}

const utils = {
    $(selector: string) {
        return document.querySelectorAll(selector);
    },
    getRandomPosition(rangeX: number, rangeY: number): randomPosiInterface{
        const x = Math.floor(Math.random() * rangeX);
        const y = Math.floor(Math.random() * rangeY);
        return {
            x: x,
            y: y,
        }
    }
};

export default utils;