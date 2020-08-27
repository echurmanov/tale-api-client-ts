import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiShopCancelSellCardResponse extends TApiSuccessResponse {
}
export declare function shopCancelSellCardV0(cardFullType: string, price: number): IRequest;
