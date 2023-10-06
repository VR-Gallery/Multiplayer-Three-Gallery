import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://api.meta-gallery.art/';

export const socket = io(URL);
