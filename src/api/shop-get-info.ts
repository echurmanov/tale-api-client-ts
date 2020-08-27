import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

export interface IShopLotInfo {
    full_type: string;          // Полный идентификатор типа карты
    max_sell_price: number;     // Стоимость самого дорогого лота
    min_sell_price: number;     // Стоимость самого дешевого лота
    name: string;               // Название карты
    owner_sell_number: number;  // Сколько карт продается с аккаунта
    sell_number: number;        // Сколько всего карт в продаже
    type: number;               // идентификатор типа карты
}

export interface IApiShopInfoResponse extends TApiSuccessResponse {
    data: {
        account_balance: number;    // Количество печенек
        info: IShopLotInfo[];       // Перечень лотов с ценами
    }
}

export function shopInfoV0(): IRequest {
    return {
        uri: `/shop/info`,
        api_version: '0.0',
        method: 'GET',
        api_client: ''
    }
}
