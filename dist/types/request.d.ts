export interface IRequest {
    uri: string;
    api_version: string;
    api_client: string;
    method: 'GET' | 'POST';
    getParams?: Record<string, string | number>;
    postParams?: Record<string, string | number>;
}
export interface IRequestCredentials {
    accountId?: number;
    sessionId?: string;
    csrfToken: string;
}
