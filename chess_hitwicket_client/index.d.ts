export interface boardType {
    board: string[][],
    userControl: boolean,
    firstSelect: [number, number],
    boardFirstSelectColor: boolean[][],
    setBoardFirstSelectColor: Function,
    setFirstSelect: Function,
    player: string
}

export interface UserNameInputBoxProps {
    userName: string;
    setUserName: Function;
    socket: Socket;
    udpatedSucessfully?:Function
  }

  export interface RoomJoinInputBoxProps {
    roomName: string;
    userName:string;
    setRoomName: Function;
  socket: Socket;
  udpatedSucessfully:Function,
  setPlayerLetter:Function
}
export interface DialogProps {
    userName: string,
    setUserName: Function,
    socket: Socket,
    setPlayerLetter: Function

}

export interface MakeMoveParams {
    board: any[][];
    setStateOfBoard: Function,
    firstSelect: [number, number];
    player: string;
    buttonSet: string[];
    position: string
  }

  export interface RoomJoinDialogProps {
    roomName: string,
    setRoomName: Function,
    socket: Socket,
    userName:string,
    setPlayerLetter:Function

}

export interface CheckboxExampleProps {
  value: string;
  setPlayerLetter:Function
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}