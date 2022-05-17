import mockRoomRepository from "../../../repositories/mock-room-repository.js";

export default function handler(req, res) {

    if (req.method === "GET") {
      const { roomId } = req.query;
      const room = mockRoomRepository.getRoom(roomId);
      res.status(200).json(room);
      return;
    }

}