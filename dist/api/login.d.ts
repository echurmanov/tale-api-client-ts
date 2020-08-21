import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiLoginResponse extends TApiSuccessResponse {
    data: {
        "next_url": string;
        "account_id": number;
        "account_name": string;
        "session_expire_at": number;
    };
}
export declare function loginV1(email: string, password: string, remember?: boolean, nextUrl?: string): IRequest;
