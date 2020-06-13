import { Readonly } from './utils';
export declare const ApiResponseStatus: {
    ok: string;
    error: string;
    processing: string;
};
export declare type TApiResponseStatus = Readonly<typeof ApiResponseStatus>;
export declare type TApiResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "code"?: string;
    readonly "error"?: string;
    readonly "errors"?: Record<string, string[]>;
    readonly "status_url"?: string;
    readonly "data"?: Record<string, any>;
};
export declare type TApiSuccessResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "data": Record<string, any>;
};
export declare type TApiProcessingResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "status_url": string;
};
export declare type TApiErrorResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "code": string;
    readonly "error": string;
    readonly "data"?: Record<string, any>;
};
export declare type TApiErrorsResponse = {
    readonly "status": keyof TApiResponseStatus;
    readonly "code": string;
    readonly "errors": Record<string, string[]>;
    readonly "data"?: Record<string, any>;
};
export declare function successResponseTypeGuard(response: TApiResponse): response is TApiSuccessResponse;
export declare function processingResponseTypeGuard(response: TApiResponse): response is TApiProcessingResponse;
export declare function errorResponseTypeGuard(response: TApiResponse): response is TApiErrorResponse;
export declare function errorsResponseTypeGuard(response: TApiResponse): response is TApiErrorsResponse;
