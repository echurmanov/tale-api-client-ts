"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopCancelSellCardV0 = void 0;
const form_data_1 = __importDefault(require("form-data"));
function shopCancelSellCardV0(cardFullType, price) {
    const formData = new form_data_1.default();
    formData.append('item_type', cardFullType);
    formData.append('price', price);
    return {
        uri: `/shop/cancel-sell-lot`,
        api_version: '0.0',
        method: 'POST',
        api_client: '',
        formData
    };
}
exports.shopCancelSellCardV0 = shopCancelSellCardV0;
//# sourceMappingURL=shop-cancel-sell.js.map