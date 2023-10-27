/**
 * 建立 HTTP Server
 */
import { createServer } from "http";

export const setupHttpServer = (port: number) => {
  const httpServer = createServer();

  httpServer.prependListener("request", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  });

  httpServer.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });

  return httpServer;
};
