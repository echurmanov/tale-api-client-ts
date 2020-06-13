import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IClan } from '../types/game-entities';
interface PlaceHistory {
    place: {
        id: number;
        name: string;
    };
    count: number;
}
interface Rating {
    name: string;
    place: number;
    value: number;
}
export interface IApiAccountInfoResponse extends TApiSuccessResponse {
    data: {
        id: number;
        registered: boolean;
        name: string;
        hero_id: number;
        places_history: PlaceHistory[];
        might: number;
        achievements: number;
        collections: number;
        referrals: number;
        ratings: Record<string, Rating>;
        permissions: {
            can_affect_game: boolean;
        };
        description: string;
        clan: IClan | null;
    };
}
export declare function getAccountInfoRequestV1(accountId: number): IRequest;
export {};
