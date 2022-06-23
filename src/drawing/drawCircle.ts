import robot from 'robotjs';

const drawCircle = (radius: number) => {
  const mouse = robot.getMousePos();

  for (let i = 0; i <= Math.PI * 2; i += 0.01) {

    const x = mouse.x + (radius * Math.cos(i));
    const y = mouse.y + (radius * Math.sin(i));

    robot.dragMouse(x, y);
    robot.mouseToggle("down");
  }
  robot.mouseToggle("up");
  return 'draw_circle';
};

export { drawCircle };
