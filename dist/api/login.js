"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginV1 = void 0;
function loginV1(email, password, remember = false, nextUrl = '/') {
    return {
        uri: '/accounts/auth/api/login',
        api_version: '1.0',
        method: 'POST',
        api_client: '',
        getParams: {
            next_url: nextUrl,
        },
        postParams: {
            email,
            password,
            remember: remember && Boolean(remember).toString() || undefined
        }
    };
}
exports.loginV1 = loginV1;
//# sourceMappingURL=login.js.map