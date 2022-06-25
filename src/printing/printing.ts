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

  let pos = 0;

  jimp.scan(0, 0, jimp.bitmap.width, jimp.bitmap.height, (x, y, idx) => {
    jimp.bitmap.data[idx + 2] = img.image.readUInt8(pos++);
    jimp.bitmap.data[idx + 1] = img.image.readUInt8(pos++);
    jimp.bitmap.data[idx] = img.image.readUInt8(pos++);
    pos++;
    jimp.bitmap.data[idx + 3] = 255;
  });

  const base64Img = await jimp.getBase64Async(Jimp.MIME_PNG);
  const base64 = base64Img.split(',')[1];
  return `prnt_scrn ${base64}`;
}

export { print };
