import FormData from 'form-data';

import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { ICardInfo } from "../types/game-entities";

export interface IApiCardCombineResponse extends TApiSuccessResponse {
    data: {
        "message": string,      // Текстовове сообщение с результатом
        "cards": ICardInfo[],   // Описание полученных карт
    }
}

export function cardCombineV3(
    cardUids: string[]
): IRequest {
    const formData = new FormData();

    cardUids.forEach(uid => {
        formData.append('card', uid);
    });

    return {
        uri: '/game/cards/api/combine',
        api_version: '3.0',
        method: 'POST',
        api_client: '',
        formData
    }
}
