import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IAccountInfo } from "../types/game-entities";
export interface IApiInfoResponse extends TApiSuccessResponse {
    data: {
        "mode": "pve" | "pvp";
        "turn": {
            "number": number;
            "verbose_date": string;
            "verbose_time": string;
        };
        "game_state": 0 | 1;
        "map_version": string;
        "account": IAccountInfo | null;
        "enemy": IAccountInfo | null;
    };
}
export declare function getInfoRequestV1v9(account?: number, clientTurns?: number[]): IRequest;
