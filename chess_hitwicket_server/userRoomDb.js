// userRoomDb.js
class UserRoomDb {
    #userRoomMap = new Map();

    constructor() {}

    addUserToRoom(userId, roomId) {
        if (!this.#userRoomMap.has(roomId)) {
            this.#userRoomMap.set(roomId, []);
        }

        const usersInRoom = this.#userRoomMap.get(roomId);

        if (usersInRoom.length < 2) {
            this.#userRoomMap.get(roomId).push(userId);
            return true;
        } else {
            return false;
        }
    }

    removeUserFromRoom(userId, roomId) {
        if (this.#userRoomMap.has(roomId)) {
            this.#userRoomMap.set(
                roomId,
                this.#userRoomMap.get(roomId).filter(id => id !== userId)
            );
            if (this.#userRoomMap.get(roomId).length === 0) {
                this.#userRoomMap.delete(roomId);
            }
        }
    }

    getUsersInRoom(roomId) {
        return this.#userRoomMap.has(roomId) ? this.#userRoomMap.get(roomId) : [];
    }

    doesRoomExist(roomId) {
        return this.#userRoomMap.has(roomId);
    }

    getRoomByUserId(userId) {
        for (let [roomId, users] of this.#userRoomMap.entries()) {
            if (users.includes(userId)) {
                return roomId;
            }
        }
        return null; // Return null if the user is not found in any room
    }
}

module.exports = UserRoomDb;
