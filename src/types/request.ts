export interface IRequest {
    uri: string;
    api_version: string;
    api_client: string;
    method: 'GET' | 'POST';
    params?: Record<string, string | number>;
}

export interface IRequestCredentials {
    accountId?: number;
    sessionId?: string;
    csrfToken: string;
}
