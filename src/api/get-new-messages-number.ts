import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiNewMessagesNumberResponse extends TApiSuccessResponse {
    data: {
        "number": number; // количество новых сообщений

    }
}

export function getNewMessagesNumberRequestV1(): IRequest {
    return {
        uri: '/accounts/messages/api/new-messages-number',
        api_version: '1.0',
        method: 'GET',
        api_client: ''
    }
}
