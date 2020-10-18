import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IPvpInfo } from "../types/game-entities";
export interface IApiPvpArenaInfoResponse extends TApiSuccessResponse {
    data: {
        info: IPvpInfo;
    };
}
export declare function pvpArenaInfoV01(): IRequest;
