import mockOccupancyRepository from "../../../../repositories/mock-occupancy-repository.js";

export default function (req, res) {
  if (req.method === "GET") {
    const { customerId } = req.query;
    const occupancy = mockOccupancyRepository.findByCustomerId(customerId);
    if (occupancy) {
      res.status(200).json(occupancy);
      return;
    }
    res.status(404).send({ message: "No occupancies found" });
    return;
  }
}
