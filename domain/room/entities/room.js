import RoomType from "./room-type.js";


export default class Room {

    roomTypePriceMap = {
        [RoomType.STANDARD]: 100,
        [RoomType.SUPERIOR]: 200,
        [RoomType.DELUXE]: 300
    };

    roomTypeCapacityMap = {
        [RoomType.STANDARD]: 2,
        [RoomType.SUPERIOR]: 3,
        [RoomType.DELUXE]: 4
    };

    constructor(id, type, status) {
        this.id = id;
        this.type = type;
        this.status = status;
    }


    get price(){
        return this.roomTypePriceMap[this.type];
    }

    get capacity(){
        return this.roomTypeCapacityMap[this.type];
    }
}
