import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiRequestLogoutResponse extends TApiSuccessResponse {
    data: {};
}
export declare function requestLogoutV1(): IRequest;
