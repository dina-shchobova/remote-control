import { httpServer } from "./src/http_server/index.js";
import { WebSocketServer } from "ws";
import { navigate } from "./src/navigation/navigation.js";
import { draw } from "./src/drawing/drawing.js";
import { print } from "./src/printing/printing.js";
import { MsgToFront } from "./src/utils/interfaces";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

let msgToFront: MsgToFront = "";

wss.on("connection", function connection(ws) {
  ws.on("message", async function message(data) {
    let msgFromFront = data.toString();
    let indexUnderscore = msgFromFront.indexOf("_", 0);
    let verb = msgFromFront.slice(0, indexUnderscore);

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

    ws.send(`${(msgToFront)}`);
  });
});

wss.on("close", function close() {
  console.log("Disconnected");
});
