import { IRequest } from "../types/request";
import { TApiProcessingResponse } from "../types/response";
import { EAbilities } from '../types/game-entities';

export interface IApiUseAbilityResponse extends TApiProcessingResponse {}

export function useAbilityV1(ability: EAbilities): IRequest {
    return {
        uri: `/game/abilities/${ability}/api/use`,
        api_version: '1.0',
        method: 'POST',
        api_client: ''
    }
}
