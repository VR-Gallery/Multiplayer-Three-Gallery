import { Server } from "socket.io";
import { playerController } from "@/services/player/playerController";

export const setupSocketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("player:join", playerController.handlePlayerJoin(socket));
    socket.on("player:update", playerController.handlePlayerUpdate(socket));
    socket.on("player:leave", playerController.handlePlayerLeave(socket));

    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });
  });
};
