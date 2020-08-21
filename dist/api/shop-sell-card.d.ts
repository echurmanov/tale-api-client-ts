import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiShopSellCardResponse extends TApiSuccessResponse {
}
export declare function shopSellCardV0(cards: string | string[], price: number): IRequest;
