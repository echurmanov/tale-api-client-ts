"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveCardToStorageV2 = void 0;
const form_data_1 = __importDefault(require("form-data"));
function moveCardToStorageV2(cards) {
    if (!Array.isArray(cards)) {
        cards = [cards];
    }
    const formData = new form_data_1.default();
    cards.forEach((cardId) => {
        formData.append('card', cardId);
    });
    return {
        uri: `/game/cards/api/move-to-storage`,
        api_version: '2.0',
        method: 'POST',
        api_client: '',
        formData
    };
}
exports.moveCardToStorageV2 = moveCardToStorageV2;
//# sourceMappingURL=move-card-to-storage.js.map