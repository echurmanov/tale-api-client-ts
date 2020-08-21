import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { ICardInfo } from "../types/game-entities";

export interface IApiReceiveCardsResponse extends TApiSuccessResponse {
    cards: ICardInfo[]
}

export function receiveCardsV1(): IRequest {
    return {
        uri: `/game/cards/api/receive`,
        api_version: '1.0',
        method: 'POST',
        api_client: ''
    }
}
