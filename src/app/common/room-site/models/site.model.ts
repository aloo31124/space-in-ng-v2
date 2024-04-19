
export class Site {
    // 座位名稱
    name = "";
    // 座位 所屬之 教室id
    roomId = "";

    constructor(site: any) {
        this.name = site["name"];
        this.roomId = site["roomId"];
    }
    
}
