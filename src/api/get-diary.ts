import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

interface DiaryMessage {                    // запись в дневнике
    "timestamp": number;                    // timestamp создания сообщения
    "game_time": string;                    // текстовое описание времени в игре
    "game_date": string;                    // текстовое описание даты в игре
    "message": string;                      // текст
    "type": number | null;                  // идентификатор типа фразы, найти идентификатор типа фразы можно в адресе страницы лингвистики с фразами этого типа
    "variables": Record<string, string>;    // словарь соотношения переменных и их значений (ВНИМАНИЕ! перечень переменных может изменяться без изменения версии этого метода)
    "position": string;                     // текстовое описание места, где герой находился во время создания записи
}

export interface IApiDiaryResponse extends TApiSuccessResponse {
    data: {
        "version": number;          // версия дневника
        "messages": DiaryMessage[]; // список последних сообщений в дневнике
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
