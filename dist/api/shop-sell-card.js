"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopSellCardV0 = void 0;
const form_data_1 = __importDefault(require("form-data"));
function shopSellCardV0(cards, price) {
    if (!Array.isArray(cards)) {
        cards = [cards];
    }
    const formData = new form_data_1.default();
    formData.append('price', price);
    cards.forEach((cardId) => {
        formData.append('card', cardId);
    });
    return {
        uri: `/shop/create-sell-lot`,
        api_version: '0.0',
        method: 'POST',
        api_client: '',
        formData
    };
}
exports.shopSellCardV0 = shopSellCardV0;
//# sourceMappingURL=shop-sell-card.js.map