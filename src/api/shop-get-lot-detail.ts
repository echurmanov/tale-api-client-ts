import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiShopGetLotDetailsResponse extends TApiSuccessResponse {
    data: {
        owner_prices: Record<string, number>;   // Лоты аккаунта <цена, количество>
        prices: Record<string, number>;         // Все лоты <цена, количество>
    }
}

export function shopGetLotDetailsV0(cardFullType: string): IRequest {
    return {
        uri: `/shop/item-type-prices`,
        api_version: '0.0',
        method: 'GET',
        api_client: '',
        getParams: {
            item_type: cardFullType
        }
    }
}
