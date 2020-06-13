import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IRegion } from '../types/game-entities';
export interface IApiRegionResponse extends TApiSuccessResponse {
    data: {
        turn: number;
        region: IRegion;
    };
}
export declare function getRegionRequestV0v1(turn?: number): IRequest;
