import { WebSocketServer, createWebSocketStream } from "ws";
import { MsgToFront } from "./src/utils/interfaces";
import { navigate } from "./src/navigation/navigation.js";
import { draw } from "./src/drawing/drawing.js";
import { print } from "./src/printing/printing.js";

const PORT = 8080;

const wss = new WebSocketServer({ port: PORT });
console.log(`Start WebSocketServer on the ${PORT} port!\n`);

let msgToFront: MsgToFront = "";

wss.on("connection", function connection(ws) {
  console.log(`The WebSocket is currently open\n`);

  const duplex = createWebSocketStream(ws, {
    encoding: 'utf8', decodeStrings: false,
  });

  duplex.on("data", async function message(data) {
    let msgFromFront = data.toString();
    let indexUnderscore = msgFromFront.indexOf("_", 0);
    let verb = msgFromFront.slice(0, indexUnderscore);
    try {
      console.log(`Command received: ${msgFromFront}`);
      switch (verb) {
        case "mouse":
          msgToFront = navigate(msgFromFront);
          break;
        case "draw":
          msgToFront = draw(msgFromFront);
          break;
        case "prnt":
          msgToFront = await print();
          break;
      }
      console.log(`Result: completed successfully\n`);
      duplex.write(`${(msgToFront)}\0`);
    } catch (e) {
      console.log(`Result: error\n`);
      duplex.write(`${(msgFromFront)}\0`);
    }

  });

  ws.on("close", function close() {
    console.log("The WebSocket is currently closed\n");
  });

  process.on('SIGINT', function() {
    console.log('The WebSocket is currently closed\n');
    wss.close();
    process.exit(0);
  });

});


