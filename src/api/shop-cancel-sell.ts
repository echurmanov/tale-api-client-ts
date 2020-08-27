import FormData from 'form-data';

import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiShopCancelSellCardResponse extends TApiSuccessResponse {}

export function shopCancelSellCardV0(cardFullType: string, price: number): IRequest {
    const formData = new FormData();
    formData.append('item_type', cardFullType);
    formData.append('price', price);

    return {
        uri: `/shop/cancel-sell-lot`,
        api_version: '0.0',
        method: 'POST',
        api_client: '',
        formData
    }
}
