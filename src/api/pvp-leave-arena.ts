import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import {IPvpInfo} from "../types/game-entities";

export interface IApiPvpLeaveArenaResponse extends TApiSuccessResponse {
    data: {
        info: IPvpInfo
    }
}

export function pvpLeaveArenaV01(): IRequest {
    return {
        uri: `/game/pvp/api/api-leave-arena`,
        api_version: '0.1',
        method: 'POST',
        api_client: '',
    }
}
