"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardCombineV3 = void 0;
const form_data_1 = __importDefault(require("form-data"));
function cardCombineV3(cardUids) {
    const formData = new form_data_1.default();
    cardUids.forEach(uid => {
        formData.append('card', uid);
    });
    return {
        uri: '/game/cards/api/combine',
        api_version: '3.0',
        method: 'POST',
        api_client: '',
        formData
    };
}
exports.cardCombineV3 = cardCombineV3;
//# sourceMappingURL=card-combine.js.map