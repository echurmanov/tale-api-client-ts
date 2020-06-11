import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IAccountInfo } from "../types/game-entities";

export interface IApiInfoResponse extends TApiSuccessResponse {
    data: {
        "mode": "pve"|"pvp",             // режим героя
        "turn": {                        // информация о номере хода
            "number": number,       // номер хода
            "verbose_date": string,      // дата для игроков (в мире Сказки)
            "verbose_time": string       // время для игроков (в мире Сказки)
        },
        "game_state": 0 | 1,     // состояние игры (остановлена/запущена, см. в описании API)
        "map_version": string,         // версия актуальной карты игры
        "account": IAccountInfo | null,  // информация о запрашиваемом аккаунте и герое
        "enemy": IAccountInfo | null     // информация о противнике, если идёт pvp сражение
    }
}

export function getInfoRequestV1v9(account?: number, clientTurns?: number[]): IRequest {
    return {
        uri: '/game/api/info',
        api_version: '1.9',
        method: 'GET',
        api_client: '',
        params: {
            account,
            client_turns: clientTurns ? clientTurns.join(',') : undefined
        }
    }
}
