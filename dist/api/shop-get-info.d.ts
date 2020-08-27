import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IShopLotInfo {
    full_type: string;
    max_sell_price: number;
    min_sell_price: number;
    name: string;
    owner_sell_number: number;
    sell_number: number;
    type: number;
}
export interface IApiShopInfoResponse extends TApiSuccessResponse {
    data: {
        account_balance: number;
        info: IShopLotInfo[];
    };
}
export declare function shopInfoV0(): IRequest;
