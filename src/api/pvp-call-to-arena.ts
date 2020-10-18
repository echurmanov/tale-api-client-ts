import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import {IPvpInfo} from "../types/game-entities";

export interface IApiPvpCallToArenaResponse extends TApiSuccessResponse {
    data: {
        info: IPvpInfo
    }
}

export function pvpCallToArenaV01(): IRequest {
    return {
        uri: `/game/pvp/api/api-call-to-arena`,
        api_version: '0.1',
        method: 'POST',
        api_client: '',
    }
}
