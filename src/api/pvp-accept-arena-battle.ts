import { IRequest } from "../types/request";
import {TApiProcessingResponse} from "../types/response";

export interface IApiPvpAcceptArenaBattleResponse extends TApiProcessingResponse {}

export function pvpAcceptArenaBattleV01(battleRequestId: number): IRequest {
    return {
        uri: `/game/pvp/api/accept-arena-battle`,
        api_version: '0.1',
        method: 'POST',
        api_client: '',
        getParams: {
            battle_request_id: battleRequestId
        }
    }
}
