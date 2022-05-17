import checkType from "../../common/utils/type-checker.js";
import RoomRepository from "../repositories/room-repository.js";

export default class GetAvailableRoomsUseCase {
  constructor(roomsRepository) {
    checkType(roomsRepository, RoomRepository);
    this.roomRepository = roomsRepository;
  }

  getAvailableRooms(roomAvailabilityQuery) {
    if (roomAvailabilityQuery.roomType == null) {
      return this.roomRepository.getAvailableRooms(roomAvailabilityQuery.date);
    } else {
      return this.roomRepository.getAvailableRoomsForType(
        roomAvailabilityQuery.date,
        roomAvailabilityQuery.roomType
      );
    }
  }
}
