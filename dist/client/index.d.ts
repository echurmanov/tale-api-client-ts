import * as API from '../api';
import { IRequestCredentials } from "../types/request";
export declare class Client {
    private readonly client;
    private readonly host;
    private readonly protocol;
    private readonly request;
    private readonly debug;
    private credentials?;
    constructor(client: string, host?: string, protocol?: 'http' | 'https', credentials?: IRequestCredentials, debug?: boolean);
    private updateCredentialByResponseHeaders;
    getCredentials(): IRequestCredentials;
    getAccountInfo(accountId?: number): Promise<API.IApiAccountInfoResponse>;
    getAuthorisationState(): Promise<API.IApiAuthorisationStateResponse>;
    login(email: string, password: string, remember?: boolean, nextUrl?: string): Promise<API.IApiLoginResponse>;
    getCardsList(): Promise<API.IApiGetCardsResponse>;
    getDiary(): Promise<API.IApiDiaryResponse>;
    getGameInfo(): Promise<API.IApiGameInfoResponse>;
    getInfo(accountId?: number, clientTurns?: number[]): Promise<API.IApiInfoResponse>;
    getPlacesList(): Promise<API.IApiPlacesListResponse>;
    getRegion(): Promise<API.IApiRegionResponse>;
    moveCardsToHand(cards: string | string[]): Promise<API.IApiMoveCardsToHandResponse>;
    moveCardsToStorage(cards: string | string[]): Promise<API.IApiMoveCardsToStorageResponse>;
    receiveCards(): Promise<API.IApiReceiveCardsResponse>;
    requestAuthorisation(appName: string, description: string, requestInfo: string): Promise<API.IApiRequestAuthorisationResponse>;
    shopSellCard(cards: string | string[], price: number): Promise<API.IApiShopSellCardResponse>;
    useCard(cardId: string, value?: string, clanName?: string, clanAbbr?: string): Promise<API.IApiUseCardResponse>;
    useHelp(): Promise<API.IApiUseAbilityResponse>;
}
