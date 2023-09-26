import { Server } from "socket.io";
import { createServer } from "http";

const port = Number(process.env.BACKEND_PORT) || 6000;

const httpServer = createServer();

httpServer.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

const frontendUrl = process.env.FRONTEND_URL || "https://meta-gallery.art";
const io = new Server(httpServer, {
  cors: {
    origin: frontendUrl,
    methods: ["GET", "POST"]
  },
});

httpServer.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
export default io;
