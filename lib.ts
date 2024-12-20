import { SessionOptions } from "iron-session";

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 7);

export interface SessionData {
    userId?:number;
    userName?:string;
    balance?:number;
    role?:string;
    isLoggedIn:boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false
}
export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "osds-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expirationDate
    }
} 
