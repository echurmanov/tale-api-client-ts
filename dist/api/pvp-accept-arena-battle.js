"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pvpAcceptArenaBattleV01 = void 0;
function pvpAcceptArenaBattleV01(battleRequestId) {
    return {
        uri: `/game/pvp/api/accept-arena-battle`,
        api_version: '0.1',
        method: 'POST',
        api_client: '',
        getParams: {
            battle_request_id: battleRequestId
        }
    };
}
exports.pvpAcceptArenaBattleV01 = pvpAcceptArenaBattleV01;
//# sourceMappingURL=pvp-accept-arena-battle.js.map