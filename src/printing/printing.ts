import robot from 'robotjs';
import Jimp from 'jimp';

const print = async () => {
  const mouse = robot.getMousePos();

  let size = 200;
  let x = mouse.x - size / 2;
  let y = mouse.y - size / 2;

  let img = robot.screen.capture(x, y, size, size);

  const jimp = new Jimp({
    'data': img.image,
    'width': img.width,
    'height': img.height
  });

  const base64Img = await jimp.getBase64Async(Jimp.MIME_PNG);
  return base64Img.split(',')[1];

}

export { print };
