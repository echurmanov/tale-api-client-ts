import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IDiaryMessage } from "../types/game-entities";

export interface IApiDiaryResponse extends TApiSuccessResponse {
    data: {
        "version": number;          // версия дневника
        "messages": IDiaryMessage[]; // список последних сообщений в дневнике
    }
}

export function getDiaryRequestV1(): IRequest {
    return {
        uri: '/game/api/diary',
        api_version: '1.0',
        method: 'GET',
        api_client: ''
    }
}
