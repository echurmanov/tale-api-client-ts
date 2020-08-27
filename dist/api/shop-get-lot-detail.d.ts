import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiShopGetLotDetailsResponse extends TApiSuccessResponse {
    data: {
        owner_prices: Record<string, number>;
        prices: Record<string, number>;
    };
}
export declare function shopGetLotDetailsV0(cardFullType: string): IRequest;
