import robot from 'robotjs';

robot.setMouseDelay(2);
let mouse = robot.getMousePos();

const navigate = (data: string) => {
  let command = data.split(' ');
  let direction = command[0];
  let step = +command[1];

  switch (direction) {
    case 'mouse_up': {
      mouse.y -= step;
      robot.moveMouse(mouse.x, mouse.y);
      return 'mouse_up';
    }
    case 'mouse_down': {
      mouse.y += step;
      robot.moveMouse(mouse.x, mouse.y - step);
      return 'mouse_down';
    }
    case 'mouse_left': {
      mouse.x -= step;
      robot.moveMouse(mouse.x - step, mouse.y);
      return 'mouse_left';
    }
    case 'mouse_right': {
      mouse.x += step;
      robot.moveMouse(mouse.x + step, mouse.y);
      return 'mouse_right';
    }
    case 'mouse_position': {
      return `mouse_position ${mouse.x},${mouse.y}`;
    }
  }
}

export { navigate, mouse };

