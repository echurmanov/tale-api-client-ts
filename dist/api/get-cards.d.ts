import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { ICardInfo } from "../types/game-entities";
export interface IApiCardsResponse extends TApiSuccessResponse {
    data: {
        cards: ICardInfo[];
        new_cards: number;
        new_card_timer: {
            speed: number;
            border: number;
            resources: number;
            resources_at: number;
            finish_at: number;
        };
    };
}
export declare function getCardsRequestV2(): IRequest;
