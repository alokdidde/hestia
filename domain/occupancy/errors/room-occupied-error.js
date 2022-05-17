export default class RoomOccupiedError extends Error {
    constructor(roomId) {
        super(`Room ${roomId} is occupied`);
        this.name = 'RoomOccupiedError';
    }
}