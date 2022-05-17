import RoomType from "../../domain/room/entities/room-type";
import RoomStatus from "../../domain/room/entities/room-status";
import RoomRepository from "../../domain/room/repositories/room-repository";
import fs from "fs";
import path from 'path';

const filePath = path.resolve('./server', 'public', 'assets', 'rooms.json');

class MockRoomRepository extends RoomRepository {

  rooms = [];

  constructor() {
    super();
    let rawData = fs.readFileSync(filePath);
    this.rooms = JSON.parse(rawData);
  }

  createRoom(room) {
    this.rooms.push(room);
    saveData(this.rooms);
    return room;
  }

  getRoom(id) {
    return this.rooms.find((room) => room.id === id);
  }

  getRooms(skip = 0, limit = 10) {
    return this.rooms;
  }

  getAvailableRooms(){
    return this.rooms.filter((room) => room.status === RoomStatus.AVAILABLE);
  };

  getAvailableRoomsForType(roomType){
    return this.rooms.filter((room) => room.type === roomType && room.status === RoomStatus.AVAILABLE);
  }

  updateRoom(room){
    const index = this.rooms.findIndex((r) => r.id === room.id);
    this.rooms[index] = room;
    saveData(this.rooms);
  }

}

function saveData(occupancies) {
  fs.writeFileSync(filePath, JSON.stringify(occupancies, null, 4));
}

const mockRoomRepository = new MockRoomRepository();
export default mockRoomRepository;