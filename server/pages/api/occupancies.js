import CheckInCommand from "../../../domain/occupancy/commands/check-in-command.js";
import mockOccupancyRepository from "../../repositories/mock-occupancy-repository.js";
import mockRoomRepository from "../../repositories/mock-room-repository.js";
import CheckInUseCase from "../../../domain/occupancy/use-cases/check-in-use-case.js";

export default function handler(req, res){

  const body = req.body;

  if (req.method === "POST") {
    const checkInCommand = new CheckInCommand(body.roomId, body.customerId);
    const checkInUseCase = new CheckInUseCase(mockOccupancyRepository, mockRoomRepository);
    const occupancy = checkInUseCase.performCheckIn(checkInCommand);
    res.status(200).json(occupancy);
    return;
  }



  res.status(405).send({ message: "Only POST requests allowed" });
  return;
}