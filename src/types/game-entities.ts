export enum EAbilities {
    help = 'help',
    drop_item = 'drop_item',
}

export enum ECardRarity {
    COMMON = 0,	    //обычная карта
    UNCOMMON = 1,	//необычная карта
    RARE = 2,	    //редкая карта
    EPIC = 3,	    //эпическая карта
    LEGENDARY = 4,	//легендарная карта
}

export type TCardType =
    5 |  //капля энергии
    6 |  //чаша Силы
    7 |  //магический вихрь
    8 |  //энергетический шторм
    9 |  //шквал Силы
    10 |  //горсть монет
    11 |  //увесистый кошель
    12 |  //сундучок на счастье
    39 |  //альтернатива
    45 |  //фея-мастерица
    46 |  //благословение Великого Творца
    47 |  //другие заботы
    48 |  //внезапная находка
    49 |  //полезный подарок
    50 |  //редкое приобретение
    51 |  //дар Хранителя
    52 |  //длань Смерти
    53 |  //неразменная монета
    54 |  //волшебный горшочек
    55 |  //скатерть самобранка
    56 |  //несметные богатства
    0 |  //рог изобилия
    74 |  //удачная мысль
    75 |  //чистый разум
    76 |  //неожиданные осложнения
    77 |  //слово Гзанзара
    78 |  //новые обстоятельства
    79 |  //специальная операция
    80 |  //слово Дабнглана
    81 |  //благословение Дабнглана
    82 |  //телепорт
    83 |  //ТАРДИС
    88 |  //волшебное точило
    89 |  //суть вещей
    90 |  //обычный спутник
    91 |  //необычный спутник
    92 |  //редкий спутник
    93 |  //эпический спутник
    94 |  //легендарный спутник
    97 |  //благословение Гзанзара
    98 |  //новый путь
    99 |  //четыре стороны
    100 |  //передышка
    101 |  //подорожник
    102 |  //священный мёд
    103 |  //молодильное яблоко
    106 |  //скрытый потенциал
    107 |  //туз в рукаве
    116 |  //новая цель
    117 |  //свежий взгляд
    118 |  //сомнения
    119 |  //прозрение
    120 |  //откровение
    121 |  //когнитивный диссонанс
    122 |  //экзистенциальный кризис
    133 |  //братство
    136 |  //клад
    137 |  //фарт
    138 |  //отгул
    139 |  //наставление
    140 |  //совместная тренировка
    141 |  //товарищество
    142 |  //единство
    143 |  //синхронизация
    144 |  //удачный поворот
    145 |  //колесо фортуны
    146 |  //белая полоса
    147 |  //прядь Кайроса
    148 |  //тишина
    149 |  //спокойствие
    150 |  //проповедь
    151 |  //Adeptus Arbites
    152 |  //взмах бабочки
    153 |  //дебют
    154 |  //миттельшпиль
    155 |  //эндшпиль
    157 |  //гильдейские дела
    156 |  //снова в путь
    158 |  //общественные дела
    159 |  //личные дела
    160    //регенирация
;

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

export interface IArenaBattleRequest {
    id: number;               // идентификатор вызова
    initiator_id: number;     // идентификатор игрока, отправившего вызов
    matchmaker_type: number;  // тип боя, см. в списке типов
    created_at: number;       // дата создания вызова
    updated_at: number;       // дата обновления вызова
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

export interface ICardInfo {
    name: string;           // название
    type: TCardType;        // тип
    full_type: string;      // полный тип карты (с учётом эффектов)
    rarity: ECardRarity;    // редкость карты
    uid: string;            // уникальный идентификатор в колоде игрока
    auction: boolean;       // может быть продана на рынке
    in_storage: boolean;    // находится ли карты в хранилище или в руке
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

    path: {                                 // Маршрут героя по карте
        cells: [number, number][]
    } | null;

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

export interface IPvpInfo {
    accounts: [];                                   //
    clans: [];                                      //
    active_arena_battles: number;                   //
    active_bot_battles: number;                     //
    arena_battle_requests: IArenaBattleRequest[];   // список активных вызовов на арену
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
