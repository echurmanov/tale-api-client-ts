import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

interface IRoad {
    "point_1_id": number; // из каого объекта (города) идёт дорога
    "point_2_id": number; // в какой объект (город) идёт дорога
    "id": number;         // идентификатор дороги
    "exists": boolean,  // видим ли дорога на карет
    "length": number;   // длинна дороги
    "path": string;       // путь из точки 1 в точку 2 по клеткам, последовательность символов:
                           // l — left — влево
                           // r — right — вправо
                           // u — up — вверх
                           // d — down — вниз
}

interface IPlace {
    "name": string;             // название
    "race": number;             // раса
    "pos": {
        "y": number;            // координаты клетки на карте
        "x": number;
    },
    "id": number;               // идентификатор города
    "size": number;             // размер
    "clan_protector": null| {   // информация о клане-протекторе города, если он есть
        id: number;             // идентификатор
        abbr: string;           // аббревиатура
        name: string;           // название
    }
}

interface IRegion {
    "format_version": string; // версия формата
    "map_version": string;    // уникальный идентификатор этой версии карты
    "width": number;           // размер карты по ширине
    "height": number;          // размер карты по высоте

    "draw_info": [ // инструкция по отрисовке
        number,         // спрайт
        0 | 1 | 2 | 3   // поворот
    ][][][]; // строки-столбцы-спрайты

    "places": Record<number, IPlace>; // Города на карте
    "roads": Record<number, IRoad>
}

export interface IApiRegionResponse extends TApiSuccessResponse {
    data: {
        "turn": number;     // номер хода, на котором была создана эта версия карты
        region: IRegion;    // описание карты
    }
}

export function getRegionRequestV0v1(turn?: number): IRequest {
    return {
        uri: '/game/map/api/region',
        api_version: '0.1',
        method: 'GET',
        api_client: '',
        params: {
            turn
        }
    }
}
