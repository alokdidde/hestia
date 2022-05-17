import OccupancyRepository from "../repositories/occupancy-repository.js";
import { expect } from "chai";
import sinon from "sinon";
import CheckInCommand from "../commands/check-in-command.js";
import CheckInUseCase from "./check-in-use-case.js";
import Occupancy from "../entities/occupancy.js";
import OccupancyStatus from "../entities/occupancy-status.js";
import RoomOccupiedError from "../errors/room-occupied-error.js";
import RoomRepository from "../../room/repositories/room-repository.js";
import Room from "../../room/entities/room.js";
import RoomStatus from "../../room/entities/room-status.js";

describe("Check In Usecase", () => {
  it("Should be able Create Check In Usecase Instance", () => {
    const occupancyRepository = new OccupancyRepository();
    const roomRepository = new RoomRepository();
    const checkInUseCase = new CheckInUseCase(
      occupancyRepository,
      roomRepository
    );
  });

  it("Should be able to check in a guest", () => {
    const occupancyRepository = new OccupancyRepository();
    const roomRepository = new RoomRepository();
    const findOccupancy = sinon
      .stub(occupancyRepository, "findByRoomIdAndStatus")
      .callsFake(() => null);
    const findRoomStub = sinon
      .stub(roomRepository, "getRoom")
      .callsFake(
        () =>
          new Room(105, "1", OccupancyStatus.CHECKED_IN, RoomStatus.AVAILABLE)
      );
    const createOccupancyStub = sinon
      .stub(occupancyRepository, "createOccupancy")
      .callsFake(
        () => new Occupancy(1, 1, new Date(), null, OccupancyStatus.CHECKED_IN)
      );
    const checkInUseCase = new CheckInUseCase(
      occupancyRepository,
      roomRepository
    );
    const checkInCommand = new CheckInCommand(1, 1);
    const occupancy = checkInUseCase.performCheckIn(checkInCommand);
    expect(createOccupancyStub.calledOnce).to.be.true;
    expect(occupancy).to.not.be.null;
    expect(occupancy.roomId).to.be.equal(1);
    expect(findRoomStub.calledOnce).to.be.true;
  });

  it("Should throw error if customer checking in to already checked in room", () => {
    const occupancyRepository = new OccupancyRepository();
    const roomRepository = new RoomRepository();
    const stub = sinon
      .stub(occupancyRepository, "findByRoomIdAndStatus")
      .callsFake(() => new Occupancy(1, 1, new Date(), new Date()));
    const checkInUseCase = new CheckInUseCase(
      occupancyRepository,
      roomRepository
    );
    const checkInCommand = new CheckInCommand(1, 1);
    expect(() => {
      const occupancy = checkInUseCase.performCheckIn(checkInCommand);
    }).to.throw(RoomOccupiedError);
  });
});
