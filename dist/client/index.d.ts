import * as API from '../api';
import { IRequestCredentials } from "../types/request";
export declare class Client {
    private readonly client;
    private readonly host;
    private readonly protocol;
    private readonly request;
    private credentials?;
    constructor(client: string, host?: string, protocol?: 'http' | 'https', credentials?: IRequestCredentials);
    private updateCredentialByResponseHeaders;
    getAccountInfo(accountId?: number): Promise<API.IApiAccountInfoResponse>;
    getAuthorisationState(): Promise<API.IApiAuthorisationStateResponse>;
    getDiary(): Promise<API.IApiDiaryResponse>;
    getGameInfo(): Promise<API.IApiGameInfoResponse>;
    getInfo(accountId?: number, clientTurns?: number[]): Promise<API.IApiInfoResponse>;
    getPlacesList(): Promise<API.IApiPlacesListResponse>;
    getRegion(): Promise<API.IApiRegionResponse>;
    requestAuthorisation(appName: string, description: string, requestInfo: string): Promise<API.IApiRequestAuthorisationResponse>;
}
