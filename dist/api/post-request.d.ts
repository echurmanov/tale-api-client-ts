import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IPostResponse extends TApiSuccessResponse {
}
export declare function postRequestV0(uri: string, formParams?: object): IRequest;
