import robot from 'robotjs';

const drawRectangle = (width: number, length: number) => {
  let mouse = robot.getMousePos();
  robot.mouseToggle('down');

  mouse.x += width;
  robot.moveMouseSmooth(mouse.x, mouse.y);
  mouse.y += length;
  robot.moveMouseSmooth(mouse.x, mouse.y);
  mouse.x -= width;
  robot.moveMouseSmooth(mouse.x, mouse.y);
  mouse.y -= length;
  robot.moveMouseSmooth(mouse.x, mouse.y);

  robot.mouseToggle('up');
  return 'draw_rectangle';
};

export { drawRectangle };
