"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAuthorisationV1 = void 0;
/**
 *
 *
 * @param applicationName Название "приложения"
 * @param applicationDescription Описание приложения
 * @param requestInfo Информация о запросе (время, источник и тп)
 */
function requestAuthorisationV1(applicationName, applicationDescription, requestInfo) {
    return {
        uri: '/accounts/third-party/tokens/api/request-authorisation',
        api_version: '1.0',
        method: 'POST',
        api_client: '',
        params: {
            application_name: applicationName,
            application_description: applicationDescription,
            application_info: requestInfo
        }
    };
}
exports.requestAuthorisationV1 = requestAuthorisationV1;
//# sourceMappingURL=request-authorisation.js.map