export declare enum EAbilities {
    help = "help",
    drop_item = "drop_item"
}
export declare enum ECardRarity {
    COMMON = 0,
    UNCOMMON = 1,
    RARE = 2,
    EPIC = 3,
    LEGENDARY = 4
}
export declare type TCardType = 5 | //капля энергии
6 | //чаша Силы
7 | //магический вихрь
8 | //энергетический шторм
9 | //шквал Силы
10 | //горсть монет
11 | //увесистый кошель
12 | //сундучок на счастье
39 | //альтернатива
45 | //фея-мастерица
46 | //благословение Великого Творца
47 | //другие заботы
48 | //внезапная находка
49 | //полезный подарок
50 | //редкое приобретение
51 | //дар Хранителя
52 | //длань Смерти
53 | //неразменная монета
54 | //волшебный горшочек
55 | //скатерть самобранка
56 | //несметные богатства
0 | //рог изобилия
74 | //удачная мысль
75 | //чистый разум
76 | //неожиданные осложнения
77 | //слово Гзанзара
78 | //новые обстоятельства
79 | //специальная операция
80 | //слово Дабнглана
81 | //благословение Дабнглана
82 | //телепорт
83 | //ТАРДИС
88 | //волшебное точило
89 | //суть вещей
90 | //обычный спутник
91 | //необычный спутник
92 | //редкий спутник
93 | //эпический спутник
94 | //легендарный спутник
97 | //благословение Гзанзара
98 | //новый путь
99 | //четыре стороны
100 | //передышка
101 | //подорожник
102 | //священный мёд
103 | //молодильное яблоко
106 | //скрытый потенциал
107 | //туз в рукаве
116 | //новая цель
117 | //свежий взгляд
118 | //сомнения
119 | //прозрение
120 | //откровение
121 | //когнитивный диссонанс
122 | //экзистенциальный кризис
133 | //братство
136 | //клад
137 | //фарт
138 | //отгул
139 | //наставление
140 | //совместная тренировка
141 | //товарищество
142 | //единство
143 | //синхронизация
144 | //удачный поворот
145 | //колесо фортуны
146 | //белая полоса
147 | //прядь Кайроса
148 | //тишина
149 | //спокойствие
150 | //проповедь
151 | //Adeptus Arbites
152 | //взмах бабочки
153 | //дебют
154 | //миттельшпиль
155 | //эндшпиль
157 | //гильдейские дела
156 | //снова в путь
158 | //общественные дела
159;
export declare enum EHeroAction {
    NO_ACTION = 0,
    QUEST_PROCESS = 1,
    BATTLE_MOB = 3,
    DEAD = 4,
    IN_TOWN = 5,
    HEALING = 6,
    CHANGE_EQUIPMENT = 7,
    TRADING = 8,
    RETUAL = 10,
    QUEST_MIDDLE_ACTION = 11,
    HERO_RELATIONS = 12,
    BATTLE_HERO = 13,
    MOCK_TEST = 14,
    HEALING_COMPANION = 15,
    FIRST_ACTION = 16,
    MOVING = 17,
    CHOOSE_WAY = 18
}
export interface IAccountInfo {
    new_messages: number;
    id: number;
    last_visit: number;
    is_own: boolean;
    is_old: boolean;
    hero: IHeroInfo;
    energy: number | null;
}
export interface IArenaBattleRequest {
    id: number;
    initiator_id: number;
    matchmaker_type: number;
    created_at: number;
    updated_at: number;
}
export interface IArtifactInfo {
    name: string;
    power: [number, number];
    type: number;
    integrity: [number, number];
    rarity: number;
    effect: number;
    special_effect: number;
    preference_rating: number;
    equipped: boolean;
    id: number;
}
export interface ICardInfo {
    name: string;
    type: TCardType;
    full_type: string;
    rarity: ECardRarity;
    uid: string;
    auction: boolean;
    in_storage: boolean;
}
export interface IClan {
    id: number;
    abbr: string;
    name: string;
}
export interface ICompanionInfo {
    type: number;
    name: string;
    health: number;
    max_health: number;
    experience: number;
    experience_to_level: number;
    coherence: number;
    real_coherence: number;
}
export interface IDiaryMessage {
    timestamp: number;
    game_time: string;
    game_date: string;
    message: string;
    type: number | null;
    variables: Record<string, string>;
    position: string;
}
export interface IHeroInfo {
    patch_turn: number | null;
    equipment: Record<number, IArtifactInfo>;
    companion: ICompanionInfo | null;
    bag: Record<number, IArtifactInfo>;
    base: {
        experience: number;
        race: number;
        health: number;
        name: string;
        level: number;
        gender: number;
        experience_to_level: number;
        max_health: number;
        destiny_points: number;
        money: number;
        alive: boolean;
    };
    secondary: {
        max_bag_size: number;
        power: [number, number];
        move_speed: number;
        loot_items_count: number;
        initiative: number;
    };
    diary: string;
    messages: TMessage[];
    habits: Record<// черты
    string, // идентификатор черты
    {
        verbose: string;
        raw: number;
    }>;
    quests: {
        quests: IQuest[];
    };
    action: {
        percents: number;
        description: string;
        info_link: string | null;
        type: EHeroAction;
        data: null | any;
    };
    position: {
        x: number;
        y: number;
        dx: number;
        dy: number;
    };
    permissions: {
        can_participate_in_pvp: boolean;
        can_repair_building: boolean;
    };
    might: {
        value: number;
        crit_chance: number;
        pvp_effectiveness_bonus: number;
        politics_power: number;
    };
    id: number;
    actual_on_turn: number;
    sprite: number;
}
export interface IPlace {
    id: number;
    name: string;
    frontier: boolean;
    position: {
        x: number;
        y: number;
    };
    size: number;
    specialization: number;
}
export interface IPvpInfo {
    accounts: [];
    clans: [];
    active_arena_battles: number;
    active_bot_battles: number;
    arena_battle_requests: IArenaBattleRequest[];
}
export interface IQuest {
    line: IQuestLine[];
}
export interface IQuestLine {
    type: string;
    uid: string;
    name: string;
    action: string;
    choice: string | null;
    choice_alternatives: TQuestChoice[];
    experience: number;
    power: number;
    actors: TQuestActors[];
}
export interface IRegion {
    format_version: string;
    map_version: string;
    width: number;
    height: number;
    draw_info: [// инструкция по отрисовке
    number, // спрайт
    // спрайт
    0 | 1 | 2 | 3][][][];
    places: Record<number, IRegionPlace>;
    roads: Record<number, IRegionRoad>;
}
export interface IRegionPlace {
    id: number;
    name: string;
    race: number;
    pos: {
        y: number;
        x: number;
    };
    size: number;
    clan_protector: IClan | null;
}
export interface IRegionRoad {
    point_1_id: number;
    point_2_id: number;
    id: number;
    exists: boolean;
    length: number;
    path: string;
}
export declare type TMessage = [number, // timestamp создания сообщения
string, // текстовое описание времени в игре
string, // текст
// текст
number | null, // идентификатор типа фразы, найти идентификатор типа фразы можно в адресе страницы лингвистики с фразами этого типа
Record<string, string>];
export declare type TQuestActors = [string, // название актёра
number, // тип актёра (список типов приведён в описании API)
TQuestActorInfo];
export declare type TQuestActorInfo = TQuestActorPlaceInfo | TQuestActorPersonInfo | TQuestActorSpendingInfo;
export declare type TQuestActorPlaceInfo = {
    id: number;
    name: string;
};
export declare type TQuestActorPersonInfo = {
    id: number;
    name: string;
    race: number;
    gender: number;
    profession: number;
    mastery_verbose: string;
    place: number;
};
export declare type TQuestActorSpendingInfo = {
    goal: string;
};
export declare type TQuestChoice = [string, // уникальный идентификатор выбора
string];
