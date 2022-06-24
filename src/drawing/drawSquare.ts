import robot from 'robotjs';

const drawSquare = (size: number) => {
  let mouse = robot.getMousePos();
  robot.mouseToggle('down');

  mouse.x += size;
  robot.moveMouseSmooth(mouse.x, mouse.y);
  mouse.y += size;
  robot.moveMouseSmooth(mouse.x, mouse.y);
  mouse.x -= size;
  robot.moveMouseSmooth(mouse.x, mouse.y);
  mouse.y -= size;
  robot.moveMouseSmooth(mouse.x, mouse.y);

  robot.mouseToggle('up');
  return 'draw_square';
};

export { drawSquare };
