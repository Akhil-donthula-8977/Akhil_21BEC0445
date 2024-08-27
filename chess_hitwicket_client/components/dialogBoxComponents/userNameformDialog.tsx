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
interface DialogProps {
    userName: string,
    setUserName: Function,
    socket: Socket,
    setIsChecked: Function,
    setPlayerLetter: Function

}
export function DialogDemo({ userName, setUserName, socket, setPlayerLetter, setIsChecked }: DialogProps) {
    const handleClick=()=>{
        DoneToast("updated successfully")
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="border-2 mb-1 border-slate-400 p-2 rounded-[50%]" ><CiEdit /></button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <UserNameInputBox userName={userName} setUserName={setUserName} socket={socket} udpatedSucessfully={handleClick} />

            </DialogContent>
        </Dialog>
    )
}
