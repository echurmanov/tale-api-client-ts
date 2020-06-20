import { IRequest } from "../types/request";
import { TApiProcessingResponse } from "../types/response";
import { EAbilities } from '../types/game-entities';
export interface IApiUseAbilityResponse extends TApiProcessingResponse {
}
export declare function useAbilityV1(ability: EAbilities): IRequest;
