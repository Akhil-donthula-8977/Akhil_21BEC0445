"use client";
import React, { useCallback, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { showToast } from "../ToastComponents/AlertUserControlToast";
import { rows, cols } from "@/constants/GameConstants";
import { showAllowablePositionsColor } from "@/lib/utils";
import { boardType } from "@/index";

export const GameBoard = ({
    board,
    userControl,
    firstSelect,
    boardFirstSelectColor,
    setBoardFirstSelectColor,
    setFirstSelect,
    player
}: boardType) => {
    const handleClick = async (row: number, col: number) => {

        if (!userControl) {
            showToast("It's not your turn!");
            return;
        }

        if (!board[row][col]) {
            if (!boardFirstSelectColor[row][col]) showToast("Please select a valid item");
            return;
        }

        if (board[row][col][0] != player) {
            showToast("You cannot select it");
            return;
        }

        setFirstSelect([row, col]);
    };

    useEffect(() => {
        if (firstSelect[0] !== -1 && firstSelect[1] !== -1 && userControl) {
            showAllowablePositionsColor(
                [...boardFirstSelectColor],
                setBoardFirstSelectColor,
                [...board],
                firstSelect[0],
                firstSelect[1],
                player
            );
        }
    }, [firstSelect, userControl]);

    return (
        <div className="flex justify-center items-center  bg-orange-400 p-4 border-[1px] border-orange-700">
            <div className="flex flex-col gap-2">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`${boardFirstSelectColor[rowIndex][colIndex] ? "bg-yellow-500 border-[4px] border-orange-900" : "bg-orange-950"} 
                                        p-4 m-1 rounded-md text-lg cursor-pointer text-white flex items-center justify-center 
                                        hover:bg-orange-700 shadow-md transition-all duration-200 ease-in-out`}
                                style={{ width: "60px", height: "60px" }}
                                onClick={() => handleClick(rowIndex, colIndex)}>
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    );
};

export default GameBoard;
