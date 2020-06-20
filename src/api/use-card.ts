import { IRequest } from "../types/request";
import { TApiProcessingResponse } from "../types/response";

export interface IApiUseCardResponse extends TApiProcessingResponse {}

export function useCardV2(card: string, value?: string, name?: string, abbr?: string): IRequest {
    return {
        uri: `/game/cards/api/use`,
        api_version: '2.0',
        method: 'POST',
        api_client: '',
        getParams: {
            card,
        },
        postParams: {
            value,
            name,
            abbr
        }
    }
}
