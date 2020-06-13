import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
export interface IApiGameInfoResponse extends TApiSuccessResponse {
    data: {
        "static_content": string;
        "game_version": string;
        "turn_delta": number;
        "account_id": number | null;
        "account_name": string | null;
        "abilities_cost": Record<string, number>;
    };
}
export declare function getGameInfoRequestV1(): IRequest;
