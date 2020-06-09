"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountInfoRequestV1 = void 0;
function getAccountInfoRequestV1(accountId) {
    return {
        uri: `/accounts/${accountId}/api/show`,
        api_version: '1.0',
        method: 'GET',
        api_client: ''
    };
}
exports.getAccountInfoRequestV1 = getAccountInfoRequestV1;
//# sourceMappingURL=get-account-info.js.map