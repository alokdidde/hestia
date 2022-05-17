

export default class RoomNotOccupiedError extends Error {
    constructor(roomId) {
        super(`Room ${roomId} is not occupied`);
        this.name = 'RoomNotOccupiedError';
    }
}