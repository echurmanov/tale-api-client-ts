import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import {IPlace} from "../types/game-entities";

export interface IApiPlacesListResponse extends TApiSuccessResponse {
    data: {
        places: Record<     // перечень всех городов
            number,         // идентификатор города: информация о нём
            IPlace
        >
    }
}

export function getPlacesListRequestV1v1(): IRequest {
    return {
        uri: '/game/places/api/list',
        api_version: '1.1',
        method: 'GET',
        api_client: ''
    }
}
