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

    constructor(
        fireStoreId: string,
        userId: string,
        mail: string,
        startDate: string,
        endDatae: string,
        startTime: string,
        endTime: string,
        bookingType: string,
        roomId: string,
        roomName: string,
        siteId: string,
        siteName: string
    ){
        this.fireStoreId = fireStoreId;
        this.userId = userId;
        this.mail = mail;
        this.startDate = startDate;
        this.endDatae = endDatae;
        this.startTime = startTime;
        this.endTime = endTime;
        this.bookingType = bookingType;
        this.roomId = roomId;
        this.roomName = roomName;
        this.siteId = siteId;
        this.siteName = siteName;
    }

}