import * as API from '../api';
import { IRequestCredentials } from "../types/request";
import { successResponseTypeGuard } from '../types/response';
import { cookieParser } from "../utils/cookie-parser";
import { generateCsrf } from "../utils/csrf-token";

export class Client {
    private readonly client: string;
    private readonly host: string;
    private readonly protocol: 'http' | 'https';
    private readonly request: typeof API.requestHttp;

    private credentials?: IRequestCredentials;

    constructor(
        client: string,
        host:string = 'the-tale.org',
        protocol: 'http' | 'https' = 'https',
        credentials?: IRequestCredentials
    ) {
        this.client = client;
        this.host = host;
        this.protocol = protocol;
        this.credentials = credentials;

        this.request = protocol === 'https' ? API.requestHttps : API.requestHttp;
    }

    private updateCredentialByResponseHeaders(headers: Record<string, string | string[]>): void {
        if (headers['set-cookie']) {
            const cookies = cookieParser(headers['set-cookie'] as string[]);
            const newCreds = this.credentials ? this.credentials : { csrfToken: generateCsrf() };

            if (cookies['sessionid']) {
                newCreds.sessionId = cookies['sessionid'];
            }

            if (cookies['csrftoken']) {
                newCreds.csrfToken = cookies['csrftoken'];
            }

            this.credentials = newCreds;
        }
    }

    async getAccountInfo(accountId?: number): Promise<API.IApiAccountInfoResponse> {
        if (!accountId && !this.credentials) {
            throw new Error("Нужно быть авторизованыи или передать accountId");
        }

        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getAccountInfoRequestV1(accountId),
            this.credentials
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiAccountInfoResponse);
        }

        throw response;
    }

    async getAuthorisationState(): Promise<API.IApiAuthorisationStateResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getAuthorisationStateV1(),
            this.credentials
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiAuthorisationStateResponse);
        }

        throw response;
    }

    async getDiary(): Promise<API.IApiDiaryResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getDiaryRequestV1(),
            this.credentials
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiDiaryResponse);
        }

        throw response;
    }

    async getGameInfo(): Promise<API.IApiGameInfoResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getGameInfoRequestV1(),
            this.credentials
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiGameInfoResponse);
        }

        throw response;
    }

    async getPlacesList(): Promise<API.IApiPlacesListResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getPlacesListRequestV1v1(),
            this.credentials
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiPlacesListResponse);
        }

        throw response;
    }

    async getRegion(): Promise<API.IApiRegionResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getRegionRequestV0v1(),
            this.credentials
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiRegionResponse);
        }

        throw response;
    }

    async requestAuthorisation(
        appName: string,
        description: string,
        requestInfo: string
    ): Promise<API.IApiRequestAuthorisationResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.requestAuthorisationV1(appName, description, requestInfo),
            this.credentials
        );

        if (successResponseTypeGuard(response)) {
            this.updateCredentialByResponseHeaders(headers);

            return (response as API.IApiRequestAuthorisationResponse);
        }

        throw response;
    }
}