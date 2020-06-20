"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCardV2 = void 0;
function useCardV2(card, value, name, abbr) {
    return {
        uri: `/game/cards/api/use`,
        api_version: '2.0',
        method: 'POST',
        api_client: '',
        getParams: {
            card,
        },
        postParams: {
            value,
            name,
            abbr
        }
    };
}
exports.useCardV2 = useCardV2;
//# sourceMappingURL=use-card.js.map