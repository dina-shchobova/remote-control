interface Position {
  x: number;
  y: number
}

type MsgToFront = string | Position | undefined;

export { Position, MsgToFront }
