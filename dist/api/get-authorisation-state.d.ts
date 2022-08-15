import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export declare const AUTH_STATE: {
    NOR_REQUESTED: number;
    WAIT_USER: number;
    SUCCESS: number;
    REJECT: number;
};
export interface IApiAuthorisationStateResponse extends TApiSuccessResponse {
    data: {
        "next_url": string;
        "account_id": number;
        "account_name": string;
        "session_expire_at": number;
        "state": 0 | 1 | 2 | 3;
    };
}
export declare function getAuthorisationStateV1(): IRequest;
export declare function getAuthorisationStateV1_1(): IRequest;
