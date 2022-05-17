import OccupancyRepository from "../../domain/occupancy/repositories/occupancy-repository.js";
import fs from "fs";
import path from 'path';
import uuid4 from "uuid4";

const filePath = path.resolve('./server', 'public', 'assets', 'occupancies.json');

class MockOccupancyRepository extends OccupancyRepository {

    occupancies = [];

    constructor(){
        super();
        let rawData = fs.readFileSync(filePath);
        this.occupancies = JSON.parse(rawData);
    }

    createOccupancy(occupancy){
        occupancy.id = uuid4();
        this.occupancies.push(occupancy);
        saveData(this.occupancies);
        return occupancy;
    };
    updateOccupancy(occupancy){
        let index = this.occupancies.findIndex(c => c.id === occupancy.id);
        this.occupancies[index] = occupancy;
        saveData(this.occupancies);
        return occupancy;
    };
    getOccupancy(occupancyId){
        return this.occupancies.find(occupancy => occupancy.id === occupancyId);
    };
    getOccupancyByRoomId(roomId){
        return this.occupancies.find(occupancy => occupancy.roomId === roomId);
    };
    findByRoomIdAndStatus(roomId, status){
        return this.occupancies.find(occupancy => occupancy.roomId === roomId && occupancy.status === status);
    };
    findByCustomerId(customerId){
        return this.occupancies.find(occupancy => occupancy.customerId === customerId);
    }
    getOccupancies(){
        return this.occupancies;
    }
    removeOccupancy(occupancyId){
        let index = this.occupancies.findIndex(c => c.id === occupancyId);
        this.occupancies.splice(index, 1);
        saveData(this.occupancies);
    }
}

function saveData(occupancies) {
    fs.writeFileSync(filePath, JSON.stringify(occupancies, null, 4));
}

const mockOccupancyRepository = new MockOccupancyRepository();

export default mockOccupancyRepository;

