import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";

type TQuestActorInfo = TQuestActorPlaceInfo | TQuestActorPersonInfo | TQuestActorSpendingInfo;

type TQuestActorPlaceInfo = {   // информация о городе
    "id": number;               // идентификатор
    "name": string;             // название города
}

type TQuestActorPersonInfo = {  // информация о жителе города
    "id": number;               // идентификатор
    "name": string;             // имя
    "race": number;             // раса
    "gender": number;           // пол
    "profession": number;       // профессия
    "mastery_verbose": string;  // профессия
    "place": number;            // идентификатор города
}

type TQuestActorSpendingInfo = {    // информация о целях накопления
    "goal": string;                 // описание цели накопления
}

type TQuestChoice = [
    string,  // уникальный идентификатор выбора
    string   // текстовое описание выбора
]

type TQuestActors = [
    string,  // название актёра
    number,  // тип актёра (список типов приведён в описании API)
    TQuestActorInfo  // данные, специфичные для конкретного типа актёра
]

interface IQuestLine {
    "type": string;                         // тип задания
    "uid": string;                          // уникальный идентификатор задания
    "name": string;                         // название задания
    "action": string;                       // описание текущего действия героя в задании
    "choice": string | null;                // текущий выбор героя в задании
    "choice_alternatives": TQuestChoice[];  //Текущие выборы героя в квесте
    "experience": number;                   // количество опыта за задание
    "power": number;                        // количество влияния за задание
    "actors": TQuestActors[];               // список «актёров», участвующих в задании
}

interface IQuest {
    "line": IQuestLine[] ; // список «базовых» заданий (цепочка последовательных заданий)
}

type TMessage = [
    number,         // timestamp создания сообщения
    string,         // текстовое описание времени в игре
    string,         // текст
    number | null,  // идентификатор типа фразы, найти идентификатор типа фразы можно в адресе страницы лингвистики с фразами этого типа
    Record<string, string> // словарь соотношения переменных и их значений (ВНИМАНИЕ! перечень переменных может изменяться без изменения версии этого метода)
]

interface IArtifactInfo {
    "name": string;                // название
    "power": [number, number];     // сила [физическая, магическая]
    "type": number;                // тип
    "integrity": [number, number]; // целостность [текущая, максимальная]
    "rarity": number;              // редкость
    "effect": number;              // тип эффекта на артефакте
    "special_effect": number;      // тип особого свойства артефакта (эффекта, который действует независимо от редкости)
    "preference_rating": number;   // «полезность» артефакта с точки зрения героя
    "equipped": boolean;           // может ли быть экипирован
    "id": number;                  // уникальный идентификатор рода артефакта
}

interface ICompanionInfo {
    "type": number;                   // тип спутника
    "name": string;                   // название/имя спутника
    "health": number;                 // текущее здоровье
    "max_health": number;             // максимальное здоровье
    "experience": number;             // текущий опыт слаженности
    "experience_to_level": number;    // опыта до следующего уровня слаженности
    "coherence": number;              // текущая слаженность
    "real_coherence": number;         // полная слаженность (без учёта ограничений на максимум слаженности)
}

interface IHeroInfo {
    "patch_turn": number | null;                // номер хода, для которого возвращается патч или null, если информация полная
    "equipment": Record<number, IArtifactInfo>; // экипировка героя, словарь <идентификатор типа экипировки, информация об артефакте>
    "companion": ICompanionInfo | null;         // информация о спутнике

    "bag": Record<number, IArtifactInfo>; // содержимое рюкзака, словарь <внутренний идентификатор предмета, описание> ()

    "base":{                           // базовые параметры героя
        "experience": number;          // текущий опыт
        "race": number;                // раса
        "health": number;              // здоровье
        "name": string;                // имя героя
        "level": number;               // уровень героя
        "gender": number;              // пол
        "experience_to_level": number; // абсолютное количество опыта до следующего уровня
        "max_health": number;          // максимальное количество здоровья
        "destiny_points": number;      // сколько способностей сейчас может выбрать
        "money": number;               // количество денег у героя
        "alive": boolean;              // жив герой или мёртв
    },

    "secondary":{                   // второстепенные параметры
        "max_bag_size": number;     // максимальный размер рюкзака
        "power": [number, number];  // физическая сила, магическая сила
        "move_speed": number;       // скорость движения
        "loot_items_count": number; // количество лута в рюкзаке
        "initiative": number;       // инициатива героя
    },

    "diary": string;       // версия дневника героя, если она изменилась, необходимо перезапросить дневни

    messages: TMessage[];  // сообщения из журнала

    habits: Record<          // черты
        string,              // идентификатор черты
        {
            verbose: string; // текущее текстовое значение черты для игрока (название характера)
            raw: number;     // текущее числовое значение черты
        }
    >;

    "quests": {             // информация о заданиях
        "quests": IQuest[]; // список глобальных заданий
    };

    "action":{                      // текущее действие
        "percents": number,         // процент выполнения
        "description": string,      // описание
        "info_link": string | null  // ссылка на доп. информацию
        "type": number              // идентификатор типа действия
        "data": null | any          // дополнительная информация о действиии или null, если такой нет
    },

    "position":{               // позиция героя на клеточной карте
        "x": number;           // координата x
        "y": number;           // координата y
        "dx": number;          // направление взгляда по x
        "dy": number;          // направленеи взгляда по y
    };

    "permissions": {                       // права на выполнение различных операций
        "can_participate_in_pvp": boolean, // может ли участвовать в pvp
        "can_repair_building": boolean,    // может ли чинить здания
    },

    "might": {                                    // могущество игрока
        "value": number;                   // величина
        "crit_chance": number;             // вероятность критического срабатывания помощи
        "pvp_effectiveness_bonus": number; // бонус к эффективности в pvp от могущества
        "politics_power": number;          // бонус к политическому влиянию героя
    },

    "id": number;                             // идентификатор
    "actual_on_turn": number;                 // данные на какой ход предоставлены

    "sprite": number;  // идентификатор спрайта, которым отображается герой
}

interface IAccountInfo {
    "new_messages": number; // количество личных сообщений
    "id": number;           // идентификатор аккаунта
    "last_visit": number;     // примерное время последнего посещения игры
    "is_own": boolean;          // информация о собственном герое или о чужом
    "is_old": boolean;          // информация устаревшая или нет
    "hero": IHeroInfo;           // информация о герое
    "energy": number | null;   // энергия игрока
}

export interface IApiInfoResponse extends TApiSuccessResponse {
    data: {
        "mode": "pve"|"pvp",             // режим героя
        "turn": {                        // информация о номере хода
            "number": number,       // номер хода
            "verbose_date": string,      // дата для игроков (в мире Сказки)
            "verbose_time": string       // время для игроков (в мире Сказки)
        },
        "game_state": 0 | 1,     // состояние игры (остановлена/запущена, см. в описании API)
        "map_version": string,         // версия актуальной карты игры
        "account": IAccountInfo | null,  // информация о запрашиваемом аккаунте и герое
        "enemy": IAccountInfo | null     // информация о противнике, если идёт pvp сражение
    }
}

export function getInfoRequestV1v9(account?: number, clientTurns?: number[]): IRequest {
    return {
        uri: '/game/api/info',
        api_version: '1.9',
        method: 'GET',
        api_client: '',
        params: {
            account,
            client_turns: clientTurns ? clientTurns.join(',') : undefined
        }
    }
}
