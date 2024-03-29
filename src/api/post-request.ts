import FormData from 'form-data';

import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IPostResponse extends TApiSuccessResponse {}

export function postRequestV0(uri: string, formParams?: object): IRequest {
    const formData = new FormData();

    if (formParams) {
        Object.keys(formParams).forEach((k: keyof object) => formData.append(k, formParams[k]));
    }

    return {
        uri: uri,
        api_version: '0.0',
        method: 'POST',
        api_client: '',
        formData
    }
}
