
export class Room {
    
    fireStoreId = "";
    name = "";
    ownerId = "";
    ownerMail = "";

    constructor(
        fireStoreId:string,
        name:string,
        ownerId:string,
        ownerMail:string,
    ) {
        this.fireStoreId = fireStoreId;
        this.name = name;
        this.ownerId = ownerId;
        this.ownerMail = ownerMail;
    }
}
