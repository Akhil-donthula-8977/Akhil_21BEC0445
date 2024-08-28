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

import { DoneToast } from "../ToastComponents/DoneToast"
import RoomJoinInputBox from "../forms/RoomJoininputBox"
import { showToast } from "../ToastComponents/AlertUserControlToast"
import { RoomJoinDialogProps } from "@/index"
export function RoomJoinDialog({ roomName, userName, setRoomName, socket, setPlayerLetter }: RoomJoinDialogProps) {
    const handleClick = (msg: string) => {
        DoneToast(msg)
        if (msg.slice(-1) == '1') {
            setPlayerLetter('B')
        }
        else {
            setPlayerLetter('A')
        }
    }
    return (
        <Dialog>
        <DialogTrigger asChild>
            <button
                className="mb-2 border-gray-400 bg-orange-900 text-white hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 p-1 rounded-[10px]  px-2  shadow-lg transition duration-200 ease-in-out"
            >
                Join Room
            </button>
        </DialogTrigger>
        <DialogContent
            className="sm:max-w-md max-w-[90vw] bg-white p-6 rounded-lg shadow-xl transition-transform transform-gpu"
            
        >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Join a Room</h2>
            <RoomJoinInputBox
                userName={userName}
                roomName={roomName}
                setPlayerLetter={setPlayerLetter}
                setRoomName={setRoomName}
                socket={socket}
                udpatedSucessfully={handleClick}
            />
        </DialogContent>
    </Dialog>
    )
}
