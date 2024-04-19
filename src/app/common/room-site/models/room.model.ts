
export class Room {
    
    fireStoreId = "";
    name = "";
    ownerId = "";
    ownerMail = "";
    bookingCount = 0;

    constructor(room: any) {
        this.fireStoreId = room["fireStoreId"];
        this.name = room["name"];
        this.ownerId = room["ownerId"];
        this.ownerMail = room["ownerMail"];
    }
}
