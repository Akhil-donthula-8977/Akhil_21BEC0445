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
import { DialogProps } from "@/index"
export function DialogDemo({ userName, setUserName, socket, setPlayerLetter,  }: DialogProps) {
    const handleClick=()=>{
        DoneToast("updated successfully")
    }
    return (
        <Dialog>
        <DialogTrigger asChild>
            <button
                className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 ease-in-out"
            >
                <CiEdit size={24} />
            </button>
        </DialogTrigger>
        <DialogContent
            className=" bg-white p-6 rounded-lg shadow-lg transition-transform transform-gpu"
           
        >
            <h2 className="text-lg font-semibold mb-4">Update User Name</h2>
            <UserNameInputBox 
                userName={userName} 
                setUserName={setUserName} 
                socket={socket} 
                udpatedSucessfully={handleClick} 
            />
        </DialogContent>
    </Dialog>
    )
}
