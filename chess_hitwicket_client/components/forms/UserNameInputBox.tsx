"use client";
import React from 'react';
import { Button } from '../ui/button';
import { Socket } from 'socket.io-client';
import { registerUser } from '@/lib/actions';
import { showToast } from '../ToastComponents/AlertUserControlToast';
import { UserNameInputBoxProps } from '@/index';

const UserNameInputBox: React.FC<UserNameInputBoxProps> = ({ userName, setUserName, socket, udpatedSucessfully }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleClick = async () => {
    if (userName.length == 0) {
      showToast("enter valid username")
    }

    if (userName) {
      await registerUser(userName, socket);
    }

    if (udpatedSucessfully != null) {
      udpatedSucessfully();
    }

  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <label
        htmlFor="username"
        className="block text-gray-800 text-lg font-semibold mb-4"
    >
        Username
    </label>
    <input
        id="username"
        type="text"
        value={userName}
        onChange={handleInputChange}
        className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        placeholder="Enter your username"
    />
    <Button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 px-4 mt-4 transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        Done
    </Button>
</div>
  );
};

export default UserNameInputBox;
