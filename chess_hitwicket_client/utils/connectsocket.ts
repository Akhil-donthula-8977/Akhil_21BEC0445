import io, { Socket } from 'socket.io-client';

let socket:Socket|null = null;

export const connectWebSocket = (url:string) => {
  if (!socket) {
    socket = io('http://localhost:3001'); // Use your WebSocket server URL here
  }
  return socket;
};