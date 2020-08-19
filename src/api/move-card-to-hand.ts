import FormData from 'form-data';

import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiMoveCardsToHandResponse extends TApiSuccessResponse {}

export function moveCardToHandV2(cards: string | string[]): IRequest {
    if (!Array.isArray(cards)) {
        cards = [cards];
    }

    const formData = new FormData();

    cards.forEach((cardId) => {
        formData.append('card', cardId)
    });

    return {
        uri: `/game/cards/api/move-to-hand`,
        api_version: '2.0',
        method: 'POST',
        api_client: '',
        formData
    }
}
