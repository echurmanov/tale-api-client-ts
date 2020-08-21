import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { ICardInfo } from "../types/game-entities";
export interface IApiReceiveCardsResponse extends TApiSuccessResponse {
    cards: ICardInfo[];
}
export declare function receiveCardsV1(): IRequest;
