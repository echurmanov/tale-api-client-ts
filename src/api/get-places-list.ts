import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiPlacesListResponse extends TApiSuccessResponse {
    data: {
        "places": Record<                   // перечень всех городов
            number,                         // идентификатор города: информация о нём
            {
                "id": number;               // идентификатор города
                "name": string;             // название города
                "frontier": boolean;        // находится ли город на фронтире
                "position": {               // координаты города на карте
                    "x": number;
                    "y": number;
                }; // (могут меняться при изменении размера карты!)
                "size": number;             // размер города
                "specialization": number;   // идентификатор специализации
            }
        >
    }
}

export function getPlacesListRequestV1(): IRequest {
    return {
        uri: '/game/places/api/list',
        api_version: '1.1',
        method: 'GET',
        api_client: ''
    }
}
