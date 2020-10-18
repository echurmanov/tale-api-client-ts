import { IRequest } from "../types/request";
import { TApiProcessingResponse } from "../types/response";
export interface IApiPvpAcceptArenaBattleResponse extends TApiProcessingResponse {
}
export declare function pvpAcceptArenaBattleV01(battleRequestId: number): IRequest;
