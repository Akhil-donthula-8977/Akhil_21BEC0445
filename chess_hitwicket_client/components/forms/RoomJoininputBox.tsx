"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Socket } from 'socket.io-client';
import { joinRoom, registerUser } from '@/lib/actions';
import { showToast } from '../ToastComponents/AlertUserControlToast';
import { RoomJoinInputBoxProps } from '@/index';
const RoomJoinInputBox: React.FC<RoomJoinInputBoxProps> = ({ setPlayerLetter,roomName,userName,setRoomName, socket,udpatedSucessfully }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleClick = async () => {
    if(userName==""){
        showToast("first enter user name")
        return;
    }
    if(roomName.length==0){
        showToast("enter valid roomName")
    }
    
    if (roomName) {

        // register room
      await joinRoom({userName,roomName}, socket,udpatedSucessfully);
      setRoomName(roomName)
    }

 
    
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <label
        htmlFor="Room"
        className="block text-gray-700 text-sm font-bold mb-2">
        Room name
      </label>
      <input
        id="username"
        type="text"
        value={roomName}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter your room anme"
      />
    
      <Button onClick={handleClick} className='bg-blue-600 hover:bg-blue-900 text-white rounded-xl mt-2'>Join room</Button>
    </div>
  );
};

export default RoomJoinInputBox;
