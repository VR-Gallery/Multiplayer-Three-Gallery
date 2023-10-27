/**
 * 以下幾乎每一個 handle function - 都屬於 curring funcxtion，它接受一個 Socket 對象作為參數，
 * 並返回一個新的函數。
 * 這樣柯里化函數並返回一個新函數的目的是為了保留對 socket 對象的引用，
 * 這樣內部函數在之後被調用時能夠訪問到正確的 socket。這種模式在 Socket.IO 的事件處理中特別有用，
 * 讓我們能很好的將特定的 socket 與特定的處理器關聯起來。
 *
 */

import { Player, playerSchema } from "common-type";
import { Socket } from "socket.io";
import { playerService } from "./index";

const handlePlayerJoin = (socket: Socket) => (data: Player) => {
  if (playerSchema.safeParse(data).success === false) {
    socket.emit("error", `Invalid data format for player:join`);
  }
  playerService.addPlayer(data);
};

const handlePlayerUpdate = (socket: Socket) => (data: Player) => {
  if (playerSchema.safeParse(data).success === false) {
    socket.emit("error", `Invalid data format for player:update`);
  }
  playerService.updatePlayer(data);
};

const handlePlayerLeave = (socket: Socket) => () => {
  playerService.removePlayer(socket.id);
};

export const playerController = {
  handlePlayerJoin,
  handlePlayerUpdate,
  handlePlayerLeave,
};
