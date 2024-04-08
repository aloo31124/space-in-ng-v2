/*
 * 該使用者基本資訊，必要欄位 
 */
export interface User {
    // 使用者id, 主要以 User表 firestore id 為主
    userFirestoreId: string;
    // ui 上呈現之姓名
    name: string;
    // 主要聯絡 email
    email: string;
    // 購買方案
    paymentList: string[];
    // 權限
    permissionList: string[];
}