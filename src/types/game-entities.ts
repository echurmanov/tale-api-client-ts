export enum EHeroAction {
    NO_ACTION = 0,	            // герой бездельничает
    QUEST_PROCESS = 1,	        // герой выполненяет задание
    BATTLE_MOB = 3,	            // герой сражается 1x1 с монстром
    DEAD = 4,	                // герой воскресает
    IN_TOWN = 5,	            // герой в городе
    HEALING = 6,	            // герой лечится
    CHANGE_EQUIPMENT = 7,	    // герой экипируется
    TRADING = 8,	            // герой торгует
    RETUAL = 10,	            // герой восстановливает энергию Хранителю
    QUEST_MIDDLE_ACTION = 11,	// техническое действие для особых действий героя в заданиях
    HERO_RELATIONS = 12,	    // техническое прокси-действие для взаимодействия героев
    BATTLE_HERO = 13,	        // герой сражается 1x1 с другим героем
    MOCK_TEST = 14,	            // техническое действие для тестов
    HEALING_COMPANION = 15,	    // герой ухаживает за спутником
    FIRST_ACTION = 16,	        // действия героя сразу после иницииации
    MOVING = 17,	            // герой движется из одной точки в другую
    CHOOSE_WAY = 18	            // герой выбирает дальнейший путь
}

export interface IAccountInfo {
    new_messages: number; // количество личных сообщений
    id: number;           // идентификатор аккаунта
    last_visit: number;     // примерное время последнего посещения игры
    is_own: boolean;          // информация о собственном герое или о чужом
    is_old: boolean;          // информация устаревшая или нет
    hero: IHeroInfo;           // информация о герое
    energy: number | null;   // энергия игрока
}

export interface IArtifactInfo {
    name: string;                // название
    power: [number, number];     // сила [физическая, магическая]
    type: number;                // тип
    integrity: [number, number]; // целостность [текущая, максимальная]
    rarity: number;              // редкость
    effect: number;              // тип эффекта на артефакте
    special_effect: number;      // тип особого свойства артефакта (эффекта, который действует независимо от редкости)
    preference_rating: number;   // «полезность» артефакта с точки зрения героя
    equipped: boolean;           // может ли быть экипирован
    id: number;                  // уникальный идентификатор рода артефакта
}

export interface IClan {
    id: number;             // идентификатор
    abbr: string;           // аббревиатура
    name: string;           // название
}

export interface ICompanionInfo {
    type: number;                   // тип спутника
    name: string;                   // название/имя спутника
    health: number;                 // текущее здоровье
    max_health: number;             // максимальное здоровье
    experience: number;             // текущий опыт слаженности
    experience_to_level: number;    // опыта до следующего уровня слаженности
    coherence: number;              // текущая слаженность
    real_coherence: number;         // полная слаженность (без учёта ограничений на максимум слаженности)
}

export interface IDiaryMessage {            // запись в дневнике
    timestamp: number;                      // timestamp создания сообщения
    game_time: string;                      // текстовое описание времени в игре
    game_date: string;                      // текстовое описание даты в игре
    message: string;                        // текст
    type: number | null;                    // идентификатор типа фразы, найти идентификатор типа фразы можно в адресе страницы лингвистики с фразами этого типа
    variables: Record<string, string>;      // словарь соотношения переменных и их значений (ВНИМАНИЕ! перечень переменных может изменяться без изменения версии этого метода)
    position: string;                       // текстовое описание места, где герой находился во время создания записи
}

export interface IHeroInfo {
    patch_turn: number | null;                // номер хода, для которого возвращается патч или null, если информация полная
    equipment: Record<number, IArtifactInfo>; // экипировка героя, словарь <идентификатор типа экипировки, информация об артефакте>
    companion: ICompanionInfo | null;         // информация о спутнике

    bag: Record<number, IArtifactInfo>; // содержимое рюкзака, словарь <внутренний идентификатор предмета, описание> ()

    base:{                           // базовые параметры героя
        experience: number;          // текущий опыт
        race: number;                // раса
        health: number;              // здоровье
        name: string;                // имя героя
        level: number;               // уровень героя
        gender: number;              // пол
        experience_to_level: number; // абсолютное количество опыта до следующего уровня
        max_health: number;          // максимальное количество здоровья
        destiny_points: number;      // сколько способностей сейчас может выбрать
        money: number;               // количество денег у героя
        alive: boolean;              // жив герой или мёртв
    },

    secondary:{                             // второстепенные параметры
        max_bag_size: number;               // максимальный размер рюкзака
        power: [number, number];            // физическая сила, магическая сила
        move_speed: number;                 // скорость движения
        loot_items_count: number;           // количество лута в рюкзаке
        initiative: number;                 // инициатива героя
    },

    diary: string;                          // версия дневника героя, если она изменилась, необходимо перезапросить дневни

    messages: TMessage[];                   // сообщения из журнала

    habits: Record<                         // черты
        string,                             // идентификатор черты
        {
            verbose: string;                // текущее текстовое значение черты для игрока (название характера)
            raw: number;                    // текущее числовое значение черты
        }
        >;

    quests: {                               // информация о заданиях
        quests: IQuest[];                   // список глобальных заданий
    };

    action:{                                // текущее действие
        percents: number;                   // процент выполнения
        description: string;                // описание
        info_link: string | null;           // ссылка на доп. информацию
        type: EHeroAction;                  // идентификатор типа действия
        data: null | any;                   // дополнительная информация о действиии или null, если такой нет
    },

    position:{                              // позиция героя на клеточной карте
        x: number;                          // координата x
        y: number;                          // координата y
        dx: number;                         // направление взгляда по x
        dy: number;                         // направленеи взгляда по y
    };

    permissions: {                          // права на выполнение различных операций
        can_participate_in_pvp: boolean,    // может ли участвовать в pvp
        can_repair_building: boolean,       // может ли чинить здания
    },

    might: {                                // могущество игрока
        value: number;                      // величина
        crit_chance: number;                // вероятность критического срабатывания помощи
        pvp_effectiveness_bonus: number;    // бонус к эффективности в pvp от могущества
        politics_power: number;             // бонус к политическому влиянию героя
    },

    id: number;                             // идентификатор
    actual_on_turn: number;                 // данные на какой ход предоставлены

    sprite: number;                         // идентификатор спрайта, которым отображается герой
}

export interface IPlace {
    id: number;               // идентификатор города
    name: string;             // название города
    frontier: boolean;        // находится ли город на фронтире
    position: {               // координаты города на карте
        x: number;
        y: number;
    }; // (могут меняться при изменении размера карты!)
    size: number;             // размер города
    specialization: number;   // идентификатор специализации
}

export interface IQuest {
    line: IQuestLine[] ; // список «базовых» заданий (цепочка последовательных заданий)
}

export interface IQuestLine {
    type: string;                         // тип задания
    uid: string;                          // уникальный идентификатор задания
    name: string;                         // название задания
    action: string;                       // описание текущего действия героя в задании
    choice: string | null;                // текущий выбор героя в задании
    choice_alternatives: TQuestChoice[];  //Текущие выборы героя в квесте
    experience: number;                   // количество опыта за задание
    power: number;                        // количество влияния за задание
    actors: TQuestActors[];               // список «актёров», участвующих в задании
}

export interface IRegion {
    format_version: string;         // версия формата
    map_version: string;            // уникальный идентификатор этой версии карты
    width: number;                  // размер карты по ширине
    height: number;                 // размер карты по высоте

    draw_info: [                    // инструкция по отрисовке
        number,         // спрайт
        0 | 1 | 2 | 3   // поворот
        ][][][];                    // строки-столбцы-спрайты
    places: Record<number, IRegionPlace>; // Города на карте
    roads: Record<number, IRegionRoad>
}

export interface IRegionPlace {
    id: number;                   // идентификатор города
    name: string;                 // название
    race: number;                 // раса
    pos: {
        y: number;                // координаты клетки на карте
        x: number;
    },
    size: number;                 // размер
    clan_protector: IClan | null  // информация о клане-протекторе города, если он есть
}

export interface IRegionRoad {
    point_1_id: number;     // из каого объекта (города) идёт дорога
    point_2_id: number;     // в какой объект (город) идёт дорога
    id: number;             // идентификатор дороги
    exists: boolean,        // видим ли дорога на карет
    length: number;         // длинна дороги
    path: string;           // путь из точки 1 в точку 2 по клеткам, последовательность символов:
                            // l — left — влево
                            // r — right — вправо
                            // u — up — вверх
                            // d — down — вниз
}

export type TMessage = [
    number,         // timestamp создания сообщения
    string,         // текстовое описание времени в игре
    string,         // текст
    number | null,  // идентификатор типа фразы, найти идентификатор типа фразы можно в адресе страницы лингвистики с фразами этого типа
    Record<string, string> // словарь соотношения переменных и их значений (ВНИМАНИЕ! перечень переменных может изменяться без изменения версии этого метода)
]

export type TQuestActors = [
    string,  // название актёра
    number,  // тип актёра (список типов приведён в описании API)
    TQuestActorInfo  // данные, специфичные для конкретного типа актёра
]

export type TQuestActorInfo = TQuestActorPlaceInfo | TQuestActorPersonInfo | TQuestActorSpendingInfo;

export type TQuestActorPlaceInfo = {   // информация о городе
    id: number;                 // идентификатор
    name: string;               // название города
}

export type TQuestActorPersonInfo = {  // информация о жителе города
    id: number;                 // идентификатор
    name: string;               // имя
    race: number;               // раса
    gender: number;             // пол
    profession: number;         // профессия
    mastery_verbose: string;    // профессия
    place: number;              // идентификатор города
}

export type TQuestActorSpendingInfo = {    // информация о целях накопления
    goal: string;                   // описание цели накопления
}

export type TQuestChoice = [
    string,  // уникальный идентификатор выбора
    string   // текстовое описание выбора
]
