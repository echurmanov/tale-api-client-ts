"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorisationStateV1_1 = exports.getAuthorisationStateV1 = exports.AUTH_STATE = void 0;
exports.AUTH_STATE = {
    NOR_REQUESTED: 0,
    WAIT_USER: 1,
    SUCCESS: 2,
    REJECT: 3 // в авторизации отказано
};
function getAuthorisationStateV1() {
    return {
        uri: '/accounts/third-party/tokens/api/authorisation-state',
        api_version: '1.0',
        method: 'GET',
        api_client: ''
    };
}
exports.getAuthorisationStateV1 = getAuthorisationStateV1;
function getAuthorisationStateV1_1() {
    return {
        uri: '/accounts/third-party/tokens/api/authorisation-state',
        api_version: '1.1',
        method: 'GET',
        api_client: ''
    };
}
exports.getAuthorisationStateV1_1 = getAuthorisationStateV1_1;
//# sourceMappingURL=get-authorisation-state.js.map