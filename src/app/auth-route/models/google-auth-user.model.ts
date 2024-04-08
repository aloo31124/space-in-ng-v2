import { User } from "src/app/common/user/models/user.model";
/*
 * google one tap 授權登入 (google auth2), 必要欄位資訊 
 */
export class GoogleAuthUser implements User {
    // user 基本欄位
    userFirestoreId: string = "";
    name = "";
    email = "";
    paymentList: string[] = [];
    permissionList: string[] = [];

    // google auth2 id
    id = "";
    // google 圖片
    imageUrl = "";
    // google auth 後資訊
    authentication = {};

    constructor(user: any) {
        this.userFirestoreId = user["userFirestoreId"];
        this.id = user["id"];
        this.name = user["name"];
        this.email = user["email"];
        this.paymentList = user["paymentList"];
        this.permissionList = user["permissionList"];
        this.imageUrl = user["imageUrl"];
        this.authentication = user["authentication"];
    }
}

