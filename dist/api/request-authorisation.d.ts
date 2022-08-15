import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiRequestAuthorisationResponse extends TApiSuccessResponse {
    data: {
        "authorisation_page": "string";
        "token"?: string;
    };
}
/**
 *
 *
 * @param applicationName Название "приложения"
 * @param applicationDescription Описание приложения
 * @param requestInfo Информация о запросе (время, источник и тп)
 */
export declare function requestAuthorisationV1(applicationName: string, applicationDescription: string, requestInfo: string): IRequest;
/**
 *
 *
 * @param applicationName Название "приложения"
 * @param applicationDescription Описание приложения
 * @param requestInfo Информация о запросе (время, источник и тп)
 */
export declare function requestAuthorisationV1_1(applicationName: string, applicationDescription: string, requestInfo: string): IRequest;
