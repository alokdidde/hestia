export default class RoomAvailabilityQuery {
  constructor(date, roomType = null) {
      if(date == null && roomType == null){
            throw new Error("Either date or roomType must be provided");
      }
      this.date = date;
      this.roomType = roomType;
  }

}
