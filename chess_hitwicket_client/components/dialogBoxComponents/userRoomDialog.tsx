import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Socket } from "socket.io-client"
import UserNameInputBox from "../forms/UserNameInputBox"
import { CiEdit } from "react-icons/ci";
import { DoneToast } from "../ToastComponents/DoneToast"
import RoomJoinInputBox from "../forms/RoomJoininputBox"
import { showToast } from "../ToastComponents/AlertUserControlToast"
interface RoomJoinDialogProps {
    roomName: string,
    setRoomName: Function,
    socket: Socket,
    userName:string,
    setPlayerLetter:Function

}
export function RoomJoinDialog({ roomName,userName, setRoomName, socket,setPlayerLetter }: RoomJoinDialogProps) {
    // if(userName=="")
    const handleClick=(msg:string)=>{
        
        DoneToast(msg)
        if(msg.slice(-1)=='1'){
            setPlayerLetter('B')
        }
        else{
            setPlayerLetter('A')
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className=" mb-1 border-slate-400 bg-blue-600 text-white hover:bg-blue-800 p-2  rounded-xl" >Join</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <RoomJoinInputBox userName={userName} roomName={roomName} setPlayerLetter={setPlayerLetter} setRoomName={setRoomName}  socket={socket} udpatedSucessfully={handleClick} />
            </DialogContent>
        </Dialog>
    )
}
