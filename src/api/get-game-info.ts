import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiGameInfoResponse extends TApiSuccessResponse {
    data: {
        "static_content": string; // базовый абсолютный путь к статическим игровым данным (например, картинкам)
        "game_version": string; // текущая версия игры
        "turn_delta": number; // задержка между ходами в секундах
        "account_id": number | null; // идентификатор аккаунта, если пользователь вошёл в игру, иначе null
        "account_name": string | null; // имя пользователя, если он вошёл в игру, иначе null
        "abilities_cost": Record<string, number>; // цена использования способностей игрока
    }
}

export function getGameInfoRequestV1(): IRequest {
    return {
        uri: '/api/info',
        api_version: '1.0',
        method: 'GET',
        api_client: ''
    }
}
