"use client"
import React, { memo, useEffect } from 'react'
import GameBoard from './GameBoard'
import { useState } from 'react'
import { startboard } from '@/constants/GameConstants'
import { firstSelectBoardInitialState, h2buttonName, remainingButton } from '@/constants/GameConstants'
import { useMemo } from 'react'
import { containsH1, containsH2,  checkWinner } from '@/lib/utils'
import { initialBoardState } from "@/constants/GameConstants";
import { Button } from "@/components/ui/button"
import { connectWebSocket } from '@/utils/connectsocket'
import { makeMove } from '@/lib/utils'
import { showToast } from '../ToastComponents/AlertUserControlToast'
import { updateMovementFromUs } from '@/lib/actions'
import UserNameInputBox from '../forms/UserNameInputBox'
import CheckboxExample from '../forms/checkBoxExample'
import { DialogDemo } from '../dialogBoxComponents/userNameformDialog'
import { RoomJoinDialog } from '../dialogBoxComponents/userRoomDialog'
import { DoneToast } from '../ToastComponents/DoneToast'

export const GameControl = () => {
    const [userControl, setUserControl] = useState<boolean>(true);
    const [stateOfBoard, setStateOfBoard] = useState<any[][]>(startboard);
    const [firstSelect, setFirstSelect] = useState<[number, number]>([-1, -1]);
    const [player, setPlayerLetter] = useState<string>("B");
    const [roomName, setRoomName] = useState<string>("");
    const [buttonSet, setbuttonSet] = useState<string[]>(remainingButton);
    const [boardFirstSelectColor, setBoardFirstSelectColor] = useState<any[][]>(initialBoardState);
    const [userName, setUserName] = useState<string>('');
    const socket = useMemo(() => { return connectWebSocket("") }, [])


    const handleClick = async (position: string) => {
        if (roomName == "") {
            showToast("join a room ")
            return;
        }
        if (!userControl) {
            showToast("It is not your turn");
            return;
        }
        if (firstSelect[0] === -1 && firstSelect[1] === -1) {
            showToast(userControl ? "Select a piece to move" : "It is not your turn");
            return;
        }
        // @ts-ignore
        const isMomentDone: [boolean, string] = makeMove({ board: [...stateOfBoard], setStateOfBoard, firstSelect, player, buttonSet, position });
        if (isMomentDone[0]) {
            setBoardFirstSelectColor(firstSelectBoardInitialState);
            setTimeout(async () => {
                await updateMovementFromUs({ roomName: roomName, table: isMomentDone[1] }, socket);
            }, 0);
            setUserControl(false);
            const winner=checkWinner(JSON.parse(isMomentDone[1]));

            if(winner=="A"){
                socket.emit("opponentWin",({roomName:roomName,player:"A"}))
            }
            else if(winner=="B"){
                socket.emit("opponentWin",({roomName:roomName,player:"B"}))
            }
        }


    };

    useEffect(() => {
       
        socket.on('moveDoneByOpponent', (data) => {
            DoneToast("it is your turn")
            setUserControl(true);
            console.log("move done", data)
            console.log(JSON.parse(data.table))
            setStateOfBoard(JSON.parse(data.table));
        })
        socket.on("opponentWin", (data) => {
            DoneToast(`${data.player} is the winner`);
        })

        return () => {
            console.log("hello")
            socket.off('message');
        };

    }, [socket]);


    useEffect(() => {

        if (userControl) {
            if (firstSelect[0] != -1 && firstSelect[1] != -1) {
                console.log(stateOfBoard[firstSelect[0]][firstSelect[1]])
                if (containsH2(stateOfBoard[firstSelect[0]][firstSelect[1]])) {
                    setbuttonSet(h2buttonName);
                }
                else {
                    setbuttonSet(remainingButton);
                }
            }
        }
    }, [userControl, firstSelect])

    return (
        <div>
            <div className="mt-4 text-gray-600 p-2 ">
                Your Roomname : <span className="font-semibold">{roomName}</span>
            </div>
            <RoomJoinDialog
                roomName={roomName}
                setRoomName={setRoomName}
                userName={userName}
                socket={socket}
                setPlayerLetter={setPlayerLetter}
            ></RoomJoinDialog>
            <GameBoard board={stateOfBoard}
                userControl={userControl}
                firstSelect={firstSelect}
                setFirstSelect={setFirstSelect}
                boardFirstSelectColor={boardFirstSelectColor}
                setBoardFirstSelectColor={setBoardFirstSelectColor}
                player={player}
            ></GameBoard>

            <div className='flex items-end gap-1  '>
                <div className="mt-4 text-gray-600 p-2 ">
                    Your username is: <span className="font-semibold">{userName}</span>
                </div>
                <DialogDemo
                    userName={userName}
                    setUserName={setUserName}
                    socket={socket}
                    setPlayerLetter={setPlayerLetter}

                ></DialogDemo>
            </div>

            <div className=" text-gray-600 mt-5 ">
                Your Moves :
            </div>
            <div className='flex justify-between mt-4 '>
                <Button variant="outline" className='hover:bg-blue-950 hover:text-white' onClick={() => { handleClick(buttonSet[0]) }}>{buttonSet[0]} </Button>
                <Button variant="outline" className='hover:bg-blue-950 hover:text-white' onClick={() => { handleClick(buttonSet[1]) }}>{buttonSet[1]}</Button>
                <Button variant="outline" className='hover:bg-blue-950 hover:text-white' onClick={() => { handleClick(buttonSet[2]) }}>{buttonSet[2]}</Button>
                <Button variant="outline" className='hover:bg-blue-950 hover:text-white' onClick={() => { handleClick(buttonSet[3]) }}>{buttonSet[3]}</Button>
            </div>
        </div>
    )
}

export default memo(GameControl)