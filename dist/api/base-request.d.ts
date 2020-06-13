import { IRequest, IRequestCredentials } from "../types/request";
import * as Response from "../types/response";
export interface RequestResponse {
    headers: Record<string, string | string[]>;
    response: Response.TApiResponse;
}
export declare function requestHttp(host: string, client: string, apiRequest: IRequest, credentials?: IRequestCredentials): Promise<RequestResponse>;
export declare function requestHttps(host: string, client: string, apiRequest: IRequest, credentials?: IRequestCredentials): Promise<RequestResponse>;
