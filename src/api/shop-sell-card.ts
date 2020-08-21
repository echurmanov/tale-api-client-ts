import FormData from 'form-data';

import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiShopSellCardResponse extends TApiSuccessResponse {}

export function shopSellCardV0(cards: string | string[], price: number): IRequest {
    if (!Array.isArray(cards)) {
        cards = [cards];
    }

    const formData = new FormData();

    formData.append('price', price);
    cards.forEach((cardId) => {
        formData.append('card', cardId)
    });

    return {
        uri: `/shop/create-sell-lot`,
        api_version: '0.0',
        method: 'POST',
        api_client: '',
        formData
    }
}
