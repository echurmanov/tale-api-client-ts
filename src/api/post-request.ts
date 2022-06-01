import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IPageResponse extends TApiSuccessResponse {}

export function getPageV0(uri: string, formParams?: object): IRequest {
    const formData = new FormData();

    if (formParams) {
        Object.values(formParams).forEach(k => formData.append(k, formParams[k]));
    }

    return {
        uri: uri,
        api_version: '0.0',
        method: 'POST',
        api_client: '',
        formData
    }
}
