"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Socket } from 'socket.io-client';
import { registerUser } from '@/lib/actions';
import { showToast } from '../ToastComponents/AlertUserControlToast';

interface UserNameInputBoxProps {
  userName: string;
  setUserName: Function;
  socket: Socket;
  udpatedSucessfully?:Function
}

const UserNameInputBox: React.FC<UserNameInputBoxProps> = ({ userName, setUserName, socket,udpatedSucessfully }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleClick = async () => {
    if(userName.length==0){
        showToast("enter valid username")
    }
    
    if (userName) {
      await registerUser(userName, socket);
    }

    if(udpatedSucessfully!=null){
      udpatedSucessfully();
    }
    
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <label
        htmlFor="username"
        className="block text-gray-700 text-sm font-bold mb-2">
        Username
      </label>
      <input
        id="username"
        type="text"
        value={userName}
        onChange={handleInputChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter your username"
      />
    
      <Button onClick={handleClick} className='bg-blue-600 hover:bg-blue-900 text-white rounded-xl m-2'>Done</Button>
    </div>
  );
};

export default UserNameInputBox;
