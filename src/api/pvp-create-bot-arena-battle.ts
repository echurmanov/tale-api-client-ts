import { IRequest } from "../types/request";
import {TApiProcessingResponse} from "../types/response";

export interface IApiPvpCreateBotArenaBattleResponse extends TApiProcessingResponse {}

export function pvpCreateBotArenaBattleV01(): IRequest {
    return {
        uri: `/game/pvp/api/create-arena-bot-battle`,
        api_version: '0.1',
        method: 'POST',
        api_client: '',
    }
}
