 class Db {
    #userSocketArray = [];

    constructor() {
    
    }

    addUserSocket(userId, socketId) {
        const userSocket = this.#userSocketArray.find(us => us.userId === userId);
        if (userSocket) {
            userSocket.socketId = socketId;
        } else {
            this.#userSocketArray.push({ userId, socketId }); 
        }
    }

    getSocketId(userId) {
        const userSocket = this.#userSocketArray.find(us => us.userId === userId);
        return userSocket ? userSocket.socketId : undefined;
    }

    removeUserSocket(socketId) {
        this.#userSocketArray = this.#userSocketArray.filter(us => us.socketId !== socketId);
    }
}

module.exports=Db