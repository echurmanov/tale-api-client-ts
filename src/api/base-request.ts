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
    response: Response.TApiResponse
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
    credentials?: IRequestCredentials
): Promise<RequestResponse> {
    return request(host, client, http, apiRequest, credentials);
}

export async function requestHttps(
    host: string,
    client: string,
    apiRequest: IRequest,
    credentials?: IRequestCredentials
): Promise<RequestResponse> {
    return request(host, client, https, apiRequest, credentials);
}

async function request( host: string,
                        client: string,
                        transport: typeof http | typeof https,
                        apiRequest: IRequest,
                        credentials?: IRequestCredentials
): Promise<RequestResponse> {
    const res = await requestRaw(host, client, https, apiRequest, credentials);
    try {
        const parsedBody = JSON.parse(res.body);

        return {
            headers: res.headers,
            response: parsedBody
        }
    } catch (e) {
        throw new Error("Error on parse server response. Not JSON: " + res.body);
    }
}

function requestRaw(
    host: string,
    client: string,
    transport: typeof http | typeof https,
    apiRequest: IRequest,
    credentials?: IRequestCredentials
): Promise<HttpRequestResponse> {
    return new Promise<HttpRequestResponse>((success, reject) => {
        const { csrfToken = generateCsrf(), sessionId = generateCsrf() } = credentials || {};

        const encodedData = querystring.encode(apiRequest.params);
        const path = buildBaseApiUrl({ ...apiRequest, api_client: client }) +
            (apiRequest.method === "GET" && encodedData ? `&${encodedData}` : '');
        const options: IRequestOptions = {
            host: host,
            path,
            method: apiRequest.method === 'POST' ? 'POST' : 'GET',
            headers: {
                Referer: 'https://' + host,
                Cookie: `csrftoken=${csrfToken}; sessionid=${sessionId}`
            }
        };

        if (options.method === 'POST') {
            options.headers['Content-type'] = 'application/x-www-form-urlencoded';
            options.headers['Content-length'] = Buffer.from(encodedData).length;
            options.headers['x-csrftoken'] = csrfToken;
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

        if (options.method === 'POST' && encodedData) {
            req.write(encodedData);
        }

        req.end();
    });
}