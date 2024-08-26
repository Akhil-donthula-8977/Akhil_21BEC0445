"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Socket } from 'socket.io-client';
import { registerUser } from '@/lib/actions';
import { showToast } from '../ToastComponents/AlertUserControlToast';

interface UserNameInputBoxProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
}

const UserNameInputBox: React.FC<UserNameInputBoxProps> = ({ userName, setUserName, socket }) => {

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
    
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <label
        htmlFor="username"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
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
      <div className="mt-4 text-gray-600">
        Your username is: <span className="font-semibold">{userName}</span>
      </div>
      <Button onClick={handleClick} className='bg-green-200 rounded-xl m-2'>Register</Button>
    </div>
  );
};

export default UserNameInputBox;
