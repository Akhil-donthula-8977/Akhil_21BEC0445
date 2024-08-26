"use client"
import React, { memo, useEffect } from 'react'
import GameBoard from './GameBoard'
import { useState } from 'react'
import { startboard } from '@/constants/GameConstants'
import { firstSelectBoardInitialState, h2buttonName, remainingButton } from '@/constants/GameConstants'
import { useMemo } from 'react'
import { containsH1, containsH2 } from '@/lib/utils'
import { initialBoardState } from "@/constants/GameConstants";
import { Button } from "@/components/ui/button"
import { connectWebSocket } from '@/utils/connectsocket'
import { makeMove } from '@/lib/utils'
import { showToast } from '../ToastComponents/AlertUserControlToast'
import { updateMovementFromUs } from '@/lib/actions'
import UserNameInputBox from '../forms/UserNameInputBox'
import CheckboxExample from '../forms/checkBoxExample'

export const GameControl = () => {
    const [userControl, setUserControl] = useState<boolean>(true);
    const [stateOfBoard, setStateOfBoard] = useState<any[][]>(startboard);
    const [firstSelect, setFirstSelect] = useState<[number, number]>([-1, -1]);
    const [player, setPlayerLetter] = useState<string>("B");
    const [opponent, setOpponent] = useState<string>("");
    const [buttonSet, setbuttonSet] = useState<string[]>(remainingButton);
    const [boardFirstSelectColor, setBoardFirstSelectColor] = useState<any[][]>(initialBoardState);
    const [userName, setUserName] = useState<string>('');
    const [BisChecked, BsetIsChecked] = useState<boolean>(false);
    const [AisChecked, AsetIsChecked] = useState<boolean>(false);
    const socket = useMemo(() => { return connectWebSocket("") }, [])


    const handleClick = async (position: string) => {
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
                await updateMovementFromUs(isMomentDone[1], socket);
            }, 0);
            setUserControl(false);
        }
    };

    useEffect(() => {
        socket.on('message', (data) => {
            console.log(data)
        });
        socket.on('moveDoneByOpponent', (data) => {
            setUserControl(true);
            setStateOfBoard(JSON.parse(data));
        })
        socket.on("opponentWin",(data)=>{
            showToast(`${data} is the winner`);
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
            <UserNameInputBox userName={userName} setUserName={setUserName} socket={socket} />
            <CheckboxExample
                setPlayerLetter={setPlayerLetter}
                value="A"
                isChecked={AisChecked}
                setIsChecked={AsetIsChecked}
            />
            <CheckboxExample
                setPlayerLetter={setPlayerLetter}
                value="B"
                isChecked={BisChecked}
                setIsChecked={BsetIsChecked}
            />
            <GameBoard board={stateOfBoard}
                userControl={userControl}
                firstSelect={firstSelect}
                setFirstSelect={setFirstSelect}
                boardFirstSelectColor={boardFirstSelectColor}
                setBoardFirstSelectColor={setBoardFirstSelectColor}
                player={player}
            ></GameBoard>
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