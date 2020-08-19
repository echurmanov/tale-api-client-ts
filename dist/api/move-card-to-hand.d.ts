import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiMoveCardsToHandResponse extends TApiSuccessResponse {
}
export declare function moveCardToHandV2(cards: string | string[]): IRequest;
