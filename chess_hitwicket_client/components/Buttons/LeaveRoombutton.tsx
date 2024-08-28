"use client"
import React from 'react'
import { Socket } from 'socket.io-client'
import { Button } from '../ui/button'
import { showToast } from '../ToastComponents/AlertUserControlToast'
import { DoneToast } from '../ToastComponents/DoneToast'

interface LeaveRoomButtonProps {
    socket: Socket;
    room: string;
    setRoomName: (name: string) => void;
    player:string
}

const LeaveRoomButton: React.FC<LeaveRoomButtonProps> = ({ socket, room, setRoomName,player }) => {
    function handleClick() {
        socket.emit('leaveRoom',{room,player});
        setRoomName('');
    }

    return (
        <div>
            <button
                className="mb-2 border-gray-400 bg-orange-900 text-white hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 p-1 rounded-[10px] px-2 shadow-lg transition duration-200 ease-in-out"
                onClick={handleClick}
            >
                Leave Room
            </button>
        </div>
    )
}

export default LeaveRoomButton;
