import RoomRepository from "../repositories/room-repository.js";
import { expect } from "chai";
import sinon from "sinon";
import IncompatibleTypeError from "../../common/errors/incompatible-type-error.js";
import AvailableRoomsUseCase from "./available-rooms-use-case.js";
import Room from "../entities/room.js";
import RoomAvailabilityQuery from "../queries/room-availability-query.js";
import RoomType from "../entities/room-type.js";
import RoomStatus from "../entities/room-status.js";

describe("Available Rooms Usecase", () => {
  
  it("Should be able Create Available Rooms Usecase Instance", () => {
    const roomRepository = new RoomRepository();
    const availableRoomsUseCase = new AvailableRoomsUseCase(roomRepository);
    expect(availableRoomsUseCase).to.not.be.null;
    expect(availableRoomsUseCase).to.be.instanceof(AvailableRoomsUseCase);
  });

  it("Should throw error when incompatible repository is passed", () => {
    expect(() => {
      const availableRoomsUseCase = new AvailableRoomsUseCase({});
    }).to.throw(IncompatibleTypeError);
  });

  it("Should be able to get available rooms for today", () => {
    const roomRepository = new RoomRepository();
    sinon
      .stub(roomRepository, "getAvailableRooms")
      .callsFake(() => [
        new Room(1, RoomType.STANDARD, RoomStatus.AVAILABLE),
        new Room(2, RoomType.SUPERIOR, RoomStatus.AVAILABLE),
        new Room(3, RoomType.STANDARD, RoomStatus.AVAILABLE),
      ]);
    const availableRoomsUseCase = new AvailableRoomsUseCase(roomRepository);
    const roomAvailabilityQuery = new RoomAvailabilityQuery(new Date());
    const rooms = availableRoomsUseCase.getAvailableRooms(
      roomAvailabilityQuery
    );
    expect(rooms).to.not.be.null;
    expect(rooms).to.be.instanceof(Array);
    expect(rooms.length).to.be.greaterThan(0);
  });


  it("Should be able to get available rooms for today of a particular type", () => {
    const roomRepository = new RoomRepository();
    const getAvailableRoomsStub = sinon
      .stub(roomRepository, "getAvailableRoomsForType")
      .callsFake(() => [
        new Room(1, RoomType.STANDARD, RoomStatus.AVAILABLE),
        new Room(2, RoomType.SUPERIOR, RoomStatus.AVAILABLE),
        new Room(3, RoomType.STANDARD, RoomStatus.AVAILABLE),
      ]);
    const availableRoomsUseCase = new AvailableRoomsUseCase(roomRepository);
    const roomAvailabilityQuery = new RoomAvailabilityQuery(new Date(), RoomType.STANDARD);
    const rooms = availableRoomsUseCase.getAvailableRooms(
      roomAvailabilityQuery
    );
    expect(rooms).to.not.be.null;
    expect(rooms).to.be.instanceof(Array);
    expect(rooms.length).to.be.greaterThan(0);
  });

});
