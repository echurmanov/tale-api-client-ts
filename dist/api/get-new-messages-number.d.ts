import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiNewMessagesNumberResponse extends TApiSuccessResponse {
    data: {
        "number": number;
    };
}
export declare function getNewMessagesNumberRequestV1(): IRequest;
