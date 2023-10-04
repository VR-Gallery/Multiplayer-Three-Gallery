import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:6000";

export const socket = io(URL);
