import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IClan } from '../types/game-entities';

interface PlaceHistory {
    place: {            // город
        id: number;     // идентификатор города
        name: string;   // название города
    },
    count: number       // количество фактов помощи
}

interface Rating {
    name: string;
    place: number;
    value: number;
}

export interface IApiAccountInfoResponse extends TApiSuccessResponse {
    data: {
        id: number;                         // идентификатор игрока
        registered: boolean;                // маркер завершения регистрации
        name: string;                       // имя игрока
        hero_id: number;                    // идентификатор героя
        places_history: PlaceHistory[];
        might: number;                      // могущество
        achievements: number;               // очки достижений
        collections: number;                // количество предметов в коллекции
        referrals: number;                  // количество последователей (рефералов)
        ratings: Record<string, Rating>;    // достижения
        permissions: {                      // права на выполнение различных операций
            can_affect_game: boolean;       // оказывает ли влияние на игру
        };
        description: string;                // описание игока, введённое им сами (в формате html)
        clan: IClan | null;                 // информация о гильдии, null, если в гильдии не состоит
    }
}

export function getAccountInfoRequestV1(accountId: number): IRequest {
    return {
        uri: `/accounts/${accountId}/api/show`,
        api_version: '1.0',
        method: 'GET',
        api_client: ''
    }
}
