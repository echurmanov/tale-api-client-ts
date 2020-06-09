import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiRequestAuthorisationResponse extends TApiSuccessResponse {
    data: {
        "authorisation_page": "string"; // адрес, на который необходимо направить пользователя для подтверждения авторизации
    }
}

/**
 *
 *
 * @param applicationName Название "приложения"
 * @param applicationDescription Описание приложения
 * @param requestInfo Информация о запросе (время, источник и тп)
 */
export function requestAuthorisationV1(
    applicationName: string,
    applicationDescription:string,
    requestInfo: string
): IRequest {
    return {
        uri: '/accounts/third-party/tokens/api/request-authorisation',
        api_version: '1.0',
        method: 'POST',
        api_client: '',
        params:{
            application_name: applicationName,
            application_description: applicationDescription,
            application_info: requestInfo
        }
    }
}
