import RoomOccupiedError from "../errors/room-occupied-error.js";
import Occupancy from "../entities/occupancy.js";
import IncompatibleTypeError from "../../common/errors/incompatible-type-error.js";
import OccupancyRepository from "../repositories/occupancy-repository.js";
import OccupancyStatus from "../entities/occupancy-status.js";
import RoomStatus from "../../room/entities/room-status.js";
import RoomRepository from "../../room/repositories/room-repository.js";

export default class CheckInUseCase {

    constructor(occupancyRepository, roomRepository) {
        if(!(occupancyRepository instanceof OccupancyRepository)){
            throw new IncompatibleTypeError("Not an instance of occupancyRepository");
        }
        if(!(roomRepository instanceof RoomRepository)){
            throw new IncompatibleTypeError("Not an instance of roomRepository");
        }
        this.occupancyRepository = occupancyRepository;
        this.roomRepository = roomRepository;
    }

    performCheckIn(checkInCommand){
        let occupancy = this.occupancyRepository.findByRoomIdAndStatus(checkInCommand.roomId, OccupancyStatus.CHECKED_IN);
        if(occupancy != null){
            throw new RoomOccupiedError("Room is occupied");
        }
        occupancy = new Occupancy(checkInCommand.roomId, checkInCommand.customerId, new Date(), null, OccupancyStatus.CHECKED_IN);
        this.occupancyRepository.createOccupancy(occupancy);
        const room = this.roomRepository.getRoom(checkInCommand.roomId);
        room.status = RoomStatus.OCCUPIED;
        this.roomRepository.updateRoom(room);
        return occupancy;
    }
}