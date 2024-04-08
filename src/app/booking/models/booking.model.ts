export class Booking {
    fireStoreId = "";
    userId = "";
    mail = "";
    startDate = "";
    endDatae = "";
    startTime = "";
    endTime = "";
    bookingType = "";
    roomId = "";
    roomName = ""
    siteId = "";
    siteName = ""

    constructor(booking: any){
        this.fireStoreId = booking["fireStoreId"];
        this.userId = booking["userId"];
        this.mail = booking["mail"];
        this.startDate = booking["startDate"];
        this.endDatae = booking["endDatae"];
        this.startTime = booking["startTime"];
        this.endTime = booking["endTime"];
        this.bookingType = booking["bookingType"];
        this.roomId = booking["roomId"];
        this.roomName = booking["roomName"];
        this.siteId = booking["siteId"];
        this.siteName = booking["siteName"];
    }

}