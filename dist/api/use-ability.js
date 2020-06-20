"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAbilityV1 = void 0;
function useAbilityV1(ability) {
    return {
        uri: `/game/abilities/${ability}/api/use`,
        api_version: '1.0',
        method: 'POST',
        api_client: ''
    };
}
exports.useAbilityV1 = useAbilityV1;
//# sourceMappingURL=use-ability.js.map