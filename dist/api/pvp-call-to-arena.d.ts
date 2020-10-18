import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IPvpInfo } from "../types/game-entities";
export interface IApiPvpCallToArenaResponse extends TApiSuccessResponse {
    data: {
        info: IPvpInfo;
    };
}
export declare function pvpCallToArenaV01(): IRequest;
