import { Socket } from "socket.io-client";
export async function updateMovementFromUs(data: Object, socket: Socket) {
  
    socket.emit("updatedMove", data);
  }
  export async function registerUser(data:string,socket:Socket){
    socket.emit('registerUser',data)
  }

  export async function  joinRoom(data:object,socket:Socket,ack:Function){
    socket.emit("joinroom",data,ack);
  }