import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IPageResponse extends TApiSuccessResponse {}

export function getPageV0(uri: string, getParams?: object): IRequest {
    return {
        uri: uri,
        api_version: '0.0',
        method: 'GET',
        api_client: '',
        getParams: {
            ...getParams
        }
    }
}
