import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export const AUTH_STATE = {
    NOR_REQUESTED: 0, // авторизация не запрашивалась
    WAIT_USER: 1, // пользователь ещё не принял решение
    SUCCESS: 2, // авторизация прошла успешно
    REJECT: 3 // в авторизации отказано
};

export interface IApiAuthorisationStateResponse extends TApiSuccessResponse {
    data: {
        "next_url": string;  // адрес, переданный при вызове метода или "/"
        "account_id": number;      // идентификатор аккаунта
        "account_name": string;         // имя игрока
        "session_expire_at": number; // время окончания сессии пользователя
        "state": 0 | 1 | 2 | 3           // состояние авторизации, см. в списке типов
    }
}

export function getAuthorisationStateV1(): IRequest {
    return {
        uri: '/accounts/third-party/tokens/api/authorisation-state',
        api_version: '1.0',
        method: 'GET',
        api_client: ''
    }
}

export function getAuthorisationStateV1_1(): IRequest {
    return {
        uri: '/accounts/third-party/tokens/api/authorisation-state',
        api_version: '1.1',
        method: 'GET',
        api_client: ''
    }
}
