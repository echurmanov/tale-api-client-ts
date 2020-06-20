import * as API from '../api';
import {AUTH_STATE} from '../api';
import {IRequestCredentials} from "../types/request";
import {processingResponseTypeGuard, successResponseTypeGuard} from '../types/response';
import {cookieParser} from "../utils/cookie-parser";
import {generateCsrf} from "../utils/csrf-token";
import {EAbilities} from "../types/game-entities";

export class Client {
    private readonly client: string;
    private readonly host: string;
    private readonly protocol: 'http' | 'https';
    private readonly request: typeof API.requestHttp;
    private readonly debug: boolean;

    private credentials?: IRequestCredentials;

    constructor(
        client: string,
        host:string = 'the-tale.org',
        protocol: 'http' | 'https' = 'https',
        credentials?: IRequestCredentials,
        debug: boolean = false
    ) {
        this.client = client;
        this.host = host;
        this.protocol = protocol;
        this.credentials = credentials;
        this.debug = debug;

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

    getCredentials(): IRequestCredentials {
        return {
            ...this.credentials
        };
    }

    async getAccountInfo(accountId?: number): Promise<API.IApiAccountInfoResponse> {
        if (!accountId && (!this.credentials || !this.credentials.accountId)) {
            throw new Error("Нужно быть авторизованыи или передать accountId");
        }

        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getAccountInfoRequestV1(accountId || this.credentials.accountId),
            this.credentials,
            this.debug
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
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            this.updateCredentialByResponseHeaders(headers);

            if (response.data.state === AUTH_STATE.SUCCESS) {
                this.credentials.accountId = response.data.account_id;
            }

            return (response as API.IApiAuthorisationStateResponse);
        }

        throw response;
    }

    async getCardsList(): Promise<API.IApiGetCardsResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getCardsRequestV2(),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiGetCardsResponse);
        }

        throw response;
    }

    async getDiary(): Promise<API.IApiDiaryResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getDiaryRequestV1(),
            this.credentials,
            this.debug
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
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiGameInfoResponse);
        }

        throw response;
    }

    async getInfo(accountId?: number, clientTurns?: number[]): Promise<API.IApiInfoResponse> {
        if (!accountId && !this.credentials) {
            throw new Error("Нужно быть авторизованыи или передать accountId");
        }

        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getInfoRequestV1v9(accountId, clientTurns),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            if (!response.data.account) {
                throw new Error("Account not found or wrong credentials");
            }

            return (response as API.IApiInfoResponse);
        }

        throw response;
    }

    async getPlacesList(): Promise<API.IApiPlacesListResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.getPlacesListRequestV1v1(),
            this.credentials,
            this.debug
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
            this.credentials,
            this.debug
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
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            this.updateCredentialByResponseHeaders(headers);

            return (response as API.IApiRequestAuthorisationResponse);
        }

        throw response;
    }

    async useCard(cardId:string, value?: string, clanName?: string, clanAbbr?:string): Promise<API.IApiUseCardResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.useCardV2(cardId, value, clanName, clanAbbr),
            this.credentials,
            this.debug
        );

        if (processingResponseTypeGuard(response)) {
            return (response as API.IApiUseCardResponse);
        }

        throw response;
    }

    async useHelp(): Promise<API.IApiUseAbilityResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.useAbilityV1(EAbilities.help),
            this.credentials,
            this.debug
        );

        if (processingResponseTypeGuard(response)) {
            return (response as API.IApiUseAbilityResponse);
        }

        throw response;
    }
}