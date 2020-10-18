import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import {IPvpInfo} from "../types/game-entities";

export interface IApiPvpArenaInfoResponse extends TApiSuccessResponse {
    data: {
        info: IPvpInfo
    }
}

export function pvpArenaInfoV01(): IRequest {
    return {
        uri: `/game/pvp/api/api-info`,
        api_version: '0.1',
        method: 'GET',
        api_client: '',
    }
}
