import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IApiLoginResponse extends TApiSuccessResponse {
    data: {
        "next_url": string,             // адрес, переданный при вызове метода или "/"
        "account_id": number,           // идентификатор аккаунта
        "account_name": string,         // имя игрока
        "session_expire_at": number     // время окончания сессии пользователя
    }
}

export function loginV1(
    email: string,
    password:string,
    remember: boolean = false,
    nextUrl: string = '/'
): IRequest {
    return {
        uri: '/accounts/auth/api/login',
        api_version: '1.0',
        method: 'POST',
        api_client: '',
        getParams: {
            next_url: nextUrl,
        },
        postParams:{
            email,
            password,
            remember : remember && Boolean(remember).toString() || undefined
        }
    }
}
