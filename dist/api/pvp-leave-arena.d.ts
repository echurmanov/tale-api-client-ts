import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IPvpInfo } from "../types/game-entities";
export interface IApiPvpLeaveArenaResponse extends TApiSuccessResponse {
    data: {
        info: IPvpInfo;
    };
}
export declare function pvpLeaveArenaV01(): IRequest;
