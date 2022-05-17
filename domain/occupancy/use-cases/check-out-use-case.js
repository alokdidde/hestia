import OccupancyStatus from "../entities/occupancy-status.js";
import RoomNotOccupiedError from "../errors/room-not-occupied-error.js";
import RoomStatus from "../../room/entities/room-status.js";

export default class CheckOutUseCase {
    constructor(occupancyRepository, roomRepository) {
        this.occupancyRepository = occupancyRepository;
        this.roomRepository = roomRepository;
    }

    performCheckout(checkOutCommand) {
        const occupancy = this.occupancyRepository.findByRoomIdAndStatus(checkOutCommand.roomId, OccupancyStatus.CHECKED_IN);
        if (occupancy == null) {
            throw new RoomNotOccupiedError("Room is not occupied");
        }
        this.checkOutDate = new Date();
        this.occupancyRepository.removeOccupancy(occupancy);
        const room = this.roomRepository.getRoom(checkOutCommand.roomId);
        room.status = RoomStatus.AVAILABLE;
        this.roomRepository.updateRoom(room);
        return occupancy;
    }
}