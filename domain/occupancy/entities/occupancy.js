

export default class Occupancy{
    constructor(roomId, customerId, checkInDate, checkOutDate, status){
        this.roomId = roomId;
        this.customerId = customerId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.status = status;
    }
}