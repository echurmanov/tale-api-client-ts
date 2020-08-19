import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiMoveCardsToStorageResponse extends TApiSuccessResponse {
}
export declare function moveCardToStorageV2(cards: string | string[]): IRequest;
