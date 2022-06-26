import robot from 'robotjs';
import { drawCircle } from "./drawCircle.js";
import { drawSquare } from "./drawSquare.js";
import { drawRectangle } from "./drawRectangle.js";
import { MsgToFront } from "../utils/interfaces";

robot.setMouseDelay(2);
let msgToFront: MsgToFront = '';

const draw = (data: string) => {
  let command = data.split(' ');
  let figure = command[0];
  let width = +command[1];
  let length = command[2] ? +command[2] : null;

  switch (figure) {
    case 'draw_circle': msgToFront = drawCircle(width); break;
    case 'draw_square': msgToFront = drawSquare(width); break;
    case 'draw_rectangle': msgToFront = drawRectangle(width, length as number); break;
  }

  return msgToFront;
}

export { draw };
