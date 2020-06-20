import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IRegion } from '../types/game-entities';

export interface IApiRegionResponse extends TApiSuccessResponse {
    data: {
        turn: number;       // номер хода, на котором была создана эта версия карты
        region: IRegion;    // описание карты
    }
}

export function getRegionRequestV0v1(turn?: number): IRequest {
    return {
        uri: '/game/map/api/region',
        api_version: '0.1',
        method: 'GET',
        api_client: '',
        getParams: {
            turn
        }
    }
}
