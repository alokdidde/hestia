import mockCustomerRepository from "../../../../repositories/mock-customer-repository.js";
import mockOccupancyRepository from "../../../../repositories/mock-occupancy-repository.js";
import mockRoomRepository from "../../../../repositories/mock-room-repository.js";
import CheckOutCommand from "../../../../../domain/occupancy/commands/check-out-command.js";
import CheckOutUseCase from "../../../../../domain/occupancy/use-cases/check-out-use-case.js";

export default function handler(req, res) {

  if (req.method === "GET") {
    const { roomId } = req.query;
    const occupancy = mockOccupancyRepository.getOccupancyByRoomId(roomId);
    res.status(200).json(occupancy);
    return;
  }

  if (req.method === "DELETE") {
    const { roomId } = req.query;

    const checkOutCommand = new CheckOutCommand(roomId);
    const checkOutUseCase = new CheckOutUseCase(
      mockOccupancyRepository,
      mockRoomRepository
    );
    const occupancy = checkOutUseCase.performCheckout(checkOutCommand);
    res.status(200).json(occupancy);
    return;
  }

  if (req.method === "PATCH") {
    const body = req.body;
    const { cid } = req.query;
    let customer = mockCustomerRepository.getCustomer(cid);
    res.status(200).json(req.body);
    return;
  }
  // if (req.method === "POST") {
  //   let customer = createCustomer(body.fullName, body.email, body.phone);
  //   res.status(200).json(customer);
  //   return;
  // }

  // if(req.method === "GET") {
  //   let customerRepository = new MockCustomerRepository();
  //   let customers = customerRepository.getCustomers();
  //   res.status(200).json(customers);
  //   return;
  // }

  // res.status(405).send({ message: "Only POST requests allowed" });
  // return;
}
