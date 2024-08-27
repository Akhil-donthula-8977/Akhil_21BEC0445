// userRoomDb.js
class UserRoomDb {
    #userRoomMap = new Map();

    constructor() {
        // Initialization if needed
    }

    addUserToRoom(userId, roomId) {
        if (!this.#userRoomMap.has(roomId)) {
            this.#userRoomMap.set(roomId, []);
        }

        const usersInRoom = this.#userRoomMap.get(roomId);

        if (usersInRoom.length < 2) {
            this.#userRoomMap.get(roomId).push(userId);
            return true; // User added successfully
        } else {
            return false; // Room is full, cannot add user
        }
    }

    removeUserFromRoom(userId, roomId) {
        if (this.#userRoomMap.has(roomId)) {
            this.#userRoomMap.set(
                roomId,
                this.#userRoomMap.get(roomId).filter(id => id !== userId)
            );
            // Remove the room entry if empty
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
}

module.exports = UserRoomDb;