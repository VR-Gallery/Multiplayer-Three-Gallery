/**
 * 建立 SocketIO Server
 * 備註：SocketIO Server 必須在 HTTP Server 啟動後才能啟動
 *     因為 SocketIO Server 會透過 HTTP Server 來傳輸資料
 */
import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { setupSocketHandler } from "./socketHandler";

export const setupWebSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  setupSocketHandler(io);
  console.log("WebSocket server is running.");
};
