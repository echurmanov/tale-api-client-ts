import { Readonly } from './utils';

export const ApiResponseStatus = {
    ok: 'ok',
    error: 'error',
    processing: 'processing'
};

export type TApiResponseStatus = Readonly<typeof ApiResponseStatus>;

export type TApiResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "code"?: string;
    readonly "error"?: string;
    readonly "errors"?: Record<string, string[]>;
    readonly "status_url"?: string;
    readonly "data"?: Record<string, any>;
};

export type TApiSuccessResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "data": Record<string, any>;
};
export type TApiProcessingResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "status_url": string;
};
export type TApiErrorResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "code": string;
    readonly "error": string;
    readonly "data"?: Record<string, any>;
};
export type TApiErrorsResponse ={
    readonly "status": keyof TApiResponseStatus;
    readonly "code": string;
    readonly "errors": Record<string, string[]>;
    readonly "data"?: Record<string, any>;
};

export function successResponseTypeGuard(response: TApiResponse): response is TApiSuccessResponse {
    return response.status === ApiResponseStatus.ok;
}

export function processingResponseTypeGuard(response: TApiResponse): response is TApiProcessingResponse {
    return response.status === ApiResponseStatus.processing;
}

export function errorResponseTypeGuard(response: TApiResponse): response is TApiErrorResponse {
    return response.status === ApiResponseStatus.error && 'error' in response;
}

export function errorsResponseTypeGuard(response: TApiResponse): response is TApiErrorsResponse {
    return response.status === ApiResponseStatus.error && 'errors' in response;
}
