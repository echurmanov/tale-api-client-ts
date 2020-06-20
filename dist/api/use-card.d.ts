import { IRequest } from "../types/request";
import { TApiProcessingResponse } from "../types/response";
export interface IApiUseCardResponse extends TApiProcessingResponse {
}
export declare function useCardV2(card: string, value?: string, name?: string, abbr?: string): IRequest;
