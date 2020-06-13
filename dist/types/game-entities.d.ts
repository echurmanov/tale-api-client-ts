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
