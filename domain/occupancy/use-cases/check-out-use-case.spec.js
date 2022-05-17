import CheckOutUseCase from "./check-out-use-case.js";
import { expect } from "chai";
import sinon from "sinon";
import CheckOutCommand from "../commands/check-out-command.js";
import OccupancyStatus from "../entities/occupancy-status.js";
import OccupancyRepository from "../repositories/occupancy-repository.js";
import Occupancy from "../entities/occupancy.js";
import RoomNotOccupiedError from "../errors/room-not-occupied-error.js";
import Room from "../../room/entities/room.js";
import RoomType from "../../room/entities/room-type.js";
import RoomStatus from "../../room/entities/room-status.js";
import RoomRepository from "../../room/repositories/room-repository.js";

describe("Check Out Usecase", () => {
  it("Should be able Create CheckoutUsecase Instance", () => {
    const occupancyRepository = new OccupancyRepository();
    const roomRepository = new RoomRepository();
    const checkOutUseCase = new CheckOutUseCase(
      occupancyRepository,
      roomRepository
    );
  });

  it("Should save in occupancy when checked out.", () => {
    const occupancyRepository = new OccupancyRepository();
    const roomRepository = new RoomRepository();
    const findOccupancyMethodStub = sinon
      .stub(occupancyRepository, "findByRoomIdAndStatus")
      .callsFake(
        () => new Occupancy(1, 1, new Date(), null, OccupancyStatus.CHECKED_IN)
      );
    const removeOccupancySpy = sinon
      .spy(occupancyRepository, "removeOccupancy");
    const getRoomStub = sinon
      .stub(roomRepository, "getRoom")
      .callsFake(() => new Room(100, RoomType.STANDARD, RoomStatus.OCCUPIED));
    const updateRoomStub = sinon
      .stub(roomRepository, "updateRoom")
      .callsFake(() => new Room(100, RoomType.STANDARD, RoomStatus.AVAILABLE));
    const checkOutUseCase = new CheckOutUseCase(
      occupancyRepository,
      roomRepository
    );
    const checkOutCommand = new CheckOutCommand(1);
    const occupancy = checkOutUseCase.performCheckout(checkOutCommand);
    expect(removeOccupancySpy.calledOnce).to.be.true;
    expect(findOccupancyMethodStub.calledOnce).to.be.true;
    expect(getRoomStub.calledOnce).to.be.true;
    expect(updateRoomStub.calledOnce).to.be.true;
    expect(occupancy).to.not.be.null;
    expect(occupancy.roomId).to.be.equal(1);
  });

  it("Should save in occupancy when checked out.", () => {
    const occupancyRepository = new OccupancyRepository();
    const roomRepository = new RoomRepository();
    const stub = sinon
      .stub(occupancyRepository, "findByRoomIdAndStatus")
      .callsFake(
        () => new Occupancy(1, 1, new Date(), null, OccupancyStatus.CHECKED_IN)
      );
    const updateOccupancySpy = sinon
      .spy(occupancyRepository, "removeOccupancy");
    const getRoomStub = sinon
      .stub(roomRepository, "getRoom")
      .callsFake(() => new Room(100, RoomType.STANDARD, RoomStatus.OCCUPIED));
    const updateRoomStub = sinon
      .stub(roomRepository, "updateRoom")
      .callsFake(() => new Room(100, RoomType.STANDARD, RoomStatus.AVAILABLE));
    const checkOutUseCase = new CheckOutUseCase(
      occupancyRepository,
      roomRepository
    );
    const checkOutCommand = new CheckOutCommand(1);
    const occupancy = checkOutUseCase.performCheckout(checkOutCommand);
    expect(updateOccupancySpy.calledOnce).to.be.true;
    expect(occupancy).to.not.be.null;
  });

  it("Should throw error if customer checking out room is not checked in", () => {
    const occupancyRepository = new OccupancyRepository();
    const roomRepository = new RoomRepository();
    const stub = sinon
      .stub(occupancyRepository, "findByRoomIdAndStatus")
      .callsFake(() => null);
    const checkOutUseCase = new CheckOutUseCase(occupancyRepository, roomRepository);
    const checkOutCommand = new CheckOutCommand(1);
    expect(() => {
      const occupancy = checkOutUseCase.performCheckout(checkOutCommand);
    }).to.throw(RoomNotOccupiedError);
  });
});
