import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiRequestLogoutResponse extends TApiSuccessResponse {
    data: {}
}

export function requestLogoutV1(): IRequest {
    return {
        uri: '/accounts/auth/api/logout',
        api_version: '1.0',
        method: 'POST',
        api_client: ''
    }
}
