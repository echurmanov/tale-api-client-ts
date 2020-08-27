import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { ICardInfo } from "../types/game-entities";
export interface IApiCardCombineResponse extends TApiSuccessResponse {
    data: {
        "message": string;
        "cards": ICardInfo[];
    };
}
export declare function cardCombineV3(cardUids: string[]): IRequest;
