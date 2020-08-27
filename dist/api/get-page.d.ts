import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IPageResponse extends TApiSuccessResponse {
}
export declare function getPageV0(uri: string, getParams?: object): IRequest;
