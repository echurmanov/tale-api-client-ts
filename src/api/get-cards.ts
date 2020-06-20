import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { ICardInfo } from "../types/game-entities";

export interface IApiGetCardsResponse extends TApiSuccessResponse {
    data: {
        cards: ICardInfo[];             // список карт
        new_cards:number;               // количество новых карт, которые можно получить

        new_card_timer: {               // таймер, отсчитывающий время получения следующей карт
            speed: number;              // скорость накопления ресурсов (в секунду)
            border: number;             // сколько «ресурсов» надо накопить, чтобы сработал таймер
            resources: number;          // количество ресурсов, которые накопились к моменту resources_at
            resources_at: number;       // время, на которое указано количество «ресурсов» в resources
            finish_at: number;          // время срабатывания таймера
        }
    }
}

export function getCardsRequestV2(): IRequest {
    return {
        uri: '/game/cards/api/get-cards',
        api_version: '2.0',
        method: 'GET',
        api_client: ''
    }
}
