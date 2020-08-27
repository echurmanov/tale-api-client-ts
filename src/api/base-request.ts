import http from 'http';
import https from 'https';
import querystring from 'querystring';

import { IRequest, IRequestCredentials } from "../types/request";
import * as Response from "../types/response";
import { generateCsrf } from "../utils/csrf-token";

interface IRequestOptions {
    host: string;
    path: string;
    method: string;
    headers: Record<string, string | number>;
}

interface HttpRequestResponse {
    headers: Record<string, string | string[]>;
    body: string;
}

export interface RequestResponse {
    headers: Record<string, string | string[]>;
    response?: Response.TApiResponse;
    responseText: string;
}

function buildBaseApiUrl(request: IRequest) {
    const baseParams = {
        api_client: request.api_client,
        api_version: request.api_version
    };

    return `${request.uri}?${querystring.encode(baseParams)}`;
}

export async function requestHttp(
    host: string,
    client: string,
    apiRequest: IRequest,
    credentials?: IRequestCredentials,
    debug: boolean = false,
    allowHtml: boolean = false
): Promise<RequestResponse> {
    return request(host, client, http, apiRequest, credentials, debug, allowHtml);
}

export async function requestHttps(
    host: string,
    client: string,
    apiRequest: IRequest,
    credentials?: IRequestCredentials,
    debug: boolean = false,
    allowHtml: boolean = false
): Promise<RequestResponse> {
    return request(host, client, https, apiRequest, credentials, debug, allowHtml);
}

async function request( host: string,
                        client: string,
                        transport: typeof http | typeof https,
                        apiRequest: IRequest,
                        credentials?: IRequestCredentials,
                        debug: boolean = false,
                        allowHtml: boolean = false
): Promise<RequestResponse> {
    const res = await requestRaw(host, client, https, apiRequest, credentials, debug);
    let parsedBody;
    try {
        parsedBody = JSON.parse(res.body);
    } catch (e) {
        if (!allowHtml) {
            throw new Error("Error on parse server response. Not JSON: " + res.body);
        }
    }

    return {
        headers: res.headers,
        response: parsedBody,
        responseText: res.body
    }
}

function requestRaw(
    host: string,
    client: string,
    transport: typeof http | typeof https,
    apiRequest: IRequest,
    credentials?: IRequestCredentials,
    debug: boolean = false
): Promise<HttpRequestResponse> {
    return new Promise<HttpRequestResponse>((success, reject) => {
        const { csrfToken = generateCsrf(), sessionId = generateCsrf() } = credentials || {};

        const extraParams = apiRequest.method === 'GET' ? {'_': (new Date()).getTime()} : {};

        const encodedGetData = querystring.encode({ ...apiRequest.getParams, ...extraParams });
        const encodedPostData = querystring.encode({ ...apiRequest.postParams });
        const path = buildBaseApiUrl({ ...apiRequest, api_client: client }) +
            (encodedGetData ? `&${encodedGetData}` : '');
        const options: IRequestOptions = {
            host: host,
            path,
            method: apiRequest.method === 'POST' ? 'POST' : 'GET',
            headers: {
                Referer: 'https://' + host,
                Cookie: `csrftoken=${csrfToken}; sessionid=${sessionId}`,
                'x-csrftoken': csrfToken
            }
        };

        if (apiRequest.formData) {
            options.headers = {
                ...options.headers,
                ...apiRequest.formData.getHeaders()
            }
        } else if (options.method === 'POST') {
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
            options.headers['content-length'] = Buffer.from(encodedPostData).length;
        }

        if (debug) {
            console.log(options);
        }

        const req = transport.request(options, (response: http.IncomingMessage) => {
            const chunks: Uint8Array[] = [];
            response.on('data', (chunk) => {
                chunks.push(chunk);
            });

            response.on('end', () => {
                success({
                    headers: response.headers,
                    body: Buffer.concat(chunks).toString('utf-8')
                });
            });
        });

        req.on('error', reject);

        if (options.method === 'POST' && encodedPostData) {
            req.write(encodedPostData);
        }

        if (apiRequest.formData) {
            apiRequest.formData.pipe(req);
        } else {
            req.end();
        }
    });
}
