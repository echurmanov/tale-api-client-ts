import FormData from 'form-data';

import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiMoveCardsToStorageResponse extends TApiSuccessResponse {}

export function moveCardToStorageV2(cards: string | string[]): IRequest {
    if (!Array.isArray(cards)) {
        cards = [cards];
    }

    const formData = new FormData();

    cards.forEach((cardId) => {
        formData.append('card', cardId)
    });

    return {
        uri: `/game/cards/api/move-to-storage`,
        api_version: '2.0',
        method: 'POST',
        api_client: '',
        formData
    }
}
