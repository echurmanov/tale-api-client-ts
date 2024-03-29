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

    async cardCombine(cardUids: string[]): Promise<API.IApiCardCombineResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.cardCombineV3(cardUids),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiCardCombineResponse);
        }

        throw response;
    }

    async getAccountInfo(accountId?: number): Promise<API.IApiAccountInfoResponse> {
        if (!accountId && !this.credentials) {
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

    async login(email: string,
                password:string,
                remember: boolean = false,
                nextUrl: string = '/'
    ): Promise<API.IApiLoginResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.loginV1(email, password, remember, nextUrl),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            this.updateCredentialByResponseHeaders(headers);

            this.credentials.accountId = (response as API.IApiLoginResponse).data.account_id;

            return (response as API.IApiLoginResponse);
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

    async getPage(uri: string, getParams?: object): Promise<string> {
        const { headers, responseText } = await this.request(
            this.host,
            this.client,
            API.getPageV0(uri, getParams),
            this.credentials,
            this.debug,
            true
        );

        return responseText;
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
    
    async postRequest(uri: string, formParams?: object): Promise<string> {
        const { headers, responseText } = await this.request(
            this.host,
            this.client,
            API.postRequestV0(uri, formParams),
            this.credentials,
            this.debug,
            true
        );

        return responseText;
    }

    async moveCardsToHand(
        cards: string|string[],
    ): Promise<API.IApiMoveCardsToHandResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.moveCardToHandV2(cards),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiMoveCardsToHandResponse);
        }

        throw response;
    }

    async moveCardsToStorage(
        cards: string|string[],
    ): Promise<API.IApiMoveCardsToStorageResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.moveCardToStorageV2(cards),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiMoveCardsToStorageResponse);
        }

        throw response;
    }

    async pvpAcceptArenaBattle(requestBattleId: number): Promise<API.IApiPvpAcceptArenaBattleResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.pvpAcceptArenaBattleV01(requestBattleId),
            this.credentials,
            this.debug
        );

        if (processingResponseTypeGuard(response)) {
            return (response as API.IApiPvpAcceptArenaBattleResponse);
        }

        throw response;
    }

    async pvpCallToArena(): Promise<API.IApiPvpCallToArenaResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.pvpCallToArenaV01(),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiPvpCallToArenaResponse);
        }

        throw response;
    }

    async pvpCreateBotArenaBattle(): Promise<API.IApiPvpCreateBotArenaBattleResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.pvpCreateBotArenaBattleV01(),
            this.credentials,
            this.debug
        );

        if (processingResponseTypeGuard(response)) {
            return (response as API.IApiPvpCreateBotArenaBattleResponse);
        }

        throw response;
    }

    async pvpArenaInfo(): Promise<API.IApiPvpArenaInfoResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.pvpArenaInfoV01(),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiPvpArenaInfoResponse);
        }

        throw response;
    }

    async pvpLeaveArena(): Promise<API.IApiPvpLeaveArenaResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.pvpLeaveArenaV01(),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiPvpLeaveArenaResponse);
        }

        throw response;
    }

    async receiveCards(): Promise<API.IApiReceiveCardsResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.receiveCardsV1(),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiReceiveCardsResponse);
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

    async shopCancelSellCard(cardFullType: string, price: number): Promise<API.IApiShopSellCardResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.shopCancelSellCardV0(cardFullType, price),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiShopCancelSellCardResponse);
        }

        throw response;
    }

    async shopGetInfo(): Promise<API.IApiShopInfoResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.shopInfoV0(),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiShopInfoResponse);
        }

        throw response;
    }

    async shopGetLotDetails(cardFullType: string): Promise<API.IApiShopGetLotDetailsResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.shopGetLotDetailsV0(cardFullType),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiShopGetLotDetailsResponse);
        }

        throw response;
    }

    async shopSellCard(cards: string|string[], price: number): Promise<API.IApiShopSellCardResponse> {
        const { headers, response } = await this.request(
            this.host,
            this.client,
            API.shopSellCardV0(cards, price),
            this.credentials,
            this.debug
        );

        if (successResponseTypeGuard(response)) {
            return (response as API.IApiShopSellCardResponse);
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
