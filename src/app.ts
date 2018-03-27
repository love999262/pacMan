import './scss/index.scss';
import Game from './components/game';

// interface GameInterface {
//     selector?: string; // 要挂载的选择器名
//     className?: string; // canvas类名
//     width?: number; // 画布宽度
//     height?: number; // 画布高度
//     bgColor?: string; // 画布背景色
//     borderColor?: string; // 画布描边
//     snakeColor?: string; // 蛇的颜色
//     snakeSize?: number; // 蛇的大小
//     snakeSpeed?: number; //蛇的速度 1 - 1000
//     rewardColor?: string; // 果实颜色
// }

const app = new Game({
    className: 'snake',
    snakeSpeed: 100,
    rewardColor: 'red',
    snakeColor: 'blue',
});