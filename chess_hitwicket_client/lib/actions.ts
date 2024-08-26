import { Socket } from "socket.io-client";
export async function updateMovementFromUs(data: string, socket: Socket) {
    console.log("Sending updated board:", data); // Log the data being sent
    socket.emit("updatedMove", data);
  }
  export async function registerUser(data:string,socket:Socket){
    socket.emit('registerUser',data)
  }