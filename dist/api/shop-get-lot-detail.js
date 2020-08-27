"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopGetLotDetailsV0 = void 0;
function shopGetLotDetailsV0(cardFullType) {
    return {
        uri: `/shop/item-type-prices`,
        api_version: '0.0',
        method: 'GET',
        api_client: '',
        getParams: {
            item_type: cardFullType
        }
    };
}
exports.shopGetLotDetailsV0 = shopGetLotDetailsV0;
//# sourceMappingURL=shop-get-lot-detail.js.map