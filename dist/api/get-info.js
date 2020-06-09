"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoRequestV1 = void 0;
function getInfoRequestV1(account, clientTurns) {
    return {
        uri: '/game/api/info',
        api_version: '1.9',
        method: 'GET',
        api_client: '',
        params: {
            account,
            client_turns: clientTurns ? clientTurns.join(',') : undefined
        }
    };
}
exports.getInfoRequestV1 = getInfoRequestV1;
//# sourceMappingURL=get-info.js.map