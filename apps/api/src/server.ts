import { Server } from "socket.io";
import { createServer } from "http";

const port = Number(process.env.BACKEND_PORT) || 6001;

const httpServer = createServer();

httpServer.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
export default io;
