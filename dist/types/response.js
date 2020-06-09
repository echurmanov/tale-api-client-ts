"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsResponseTypeGuard = exports.errorResponseTypeGuard = exports.processingResponseTypeGuard = exports.successResponseTypeGuard = exports.ApiResponseStatus = void 0;
exports.ApiResponseStatus = {
    ok: 'ok',
    error: 'error',
    processing: 'processing'
};
function successResponseTypeGuard(response) {
    return response.status === exports.ApiResponseStatus.ok;
}
exports.successResponseTypeGuard = successResponseTypeGuard;
function processingResponseTypeGuard(response) {
    return response.status === exports.ApiResponseStatus.processing;
}
exports.processingResponseTypeGuard = processingResponseTypeGuard;
function errorResponseTypeGuard(response) {
    return response.status === exports.ApiResponseStatus.error && 'error' in response;
}
exports.errorResponseTypeGuard = errorResponseTypeGuard;
function errorsResponseTypeGuard(response) {
    return response.status === exports.ApiResponseStatus.error && 'errors' in response;
}
exports.errorsResponseTypeGuard = errorsResponseTypeGuard;
//# sourceMappingURL=response.js.map