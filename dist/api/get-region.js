"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegionRequestV0v1 = void 0;
function getRegionRequestV0v1(turn) {
    return {
        uri: '/game/map/api/region',
        api_version: '0.1',
        method: 'GET',
        api_client: '',
        params: {
            turn
        }
    };
}
exports.getRegionRequestV0v1 = getRegionRequestV0v1;
//# sourceMappingURL=get-region.js.map