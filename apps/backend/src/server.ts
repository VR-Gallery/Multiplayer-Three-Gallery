import { Server } from "socket.io";
import { createServer } from "http";

const port = Number(process.env.BACKEND_PORT) || 6000;

const httpServer = createServer((req: any, res: any) => {
  res.writeHead(200);
  res.end("socket.io");
});

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const io = new Server(httpServer, {
  cors: {
    origin: frontendUrl,
  },
});

httpServer.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
export default io;
