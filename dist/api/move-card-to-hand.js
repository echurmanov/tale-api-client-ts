"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveCardToHandV2 = void 0;
const form_data_1 = __importDefault(require("form-data"));
function moveCardToHandV2(cards) {
    if (!Array.isArray(cards)) {
        cards = [cards];
    }
    const formData = new form_data_1.default();
    cards.forEach((cardId) => {
        formData.append('card', cardId);
    });
    return {
        uri: `/game/cards/api/move-to-hand`,
        api_version: '2.0',
        method: 'POST',
        api_client: '',
        formData
    };
}
exports.moveCardToHandV2 = moveCardToHandV2;
//# sourceMappingURL=move-card-to-hand.js.map