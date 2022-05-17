import mockRoomRepository from "../../repositories/mock-room-repository.js";

export default (req, res) => {
  if (req.method === "GET") {
    const query = req.query;
    if (query != null && query.filter === "available") {
      let rooms = mockRoomRepository.getAvailableRooms();
      res.status(200).json(rooms);
      return;
    } else {
      let rooms = mockRoomRepository.getRooms();
      res.status(200).json(rooms);
      return;
    }
  }

  res.status(405).send({ message: "Only GET requests allowed" });
};
