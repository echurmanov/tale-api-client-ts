"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRequestV0 = void 0;
const form_data_1 = __importDefault(require("form-data"));
function postRequestV0(uri, formParams) {
    const formData = new form_data_1.default();
    if (formParams) {
        Object.values(formParams).forEach((k) => formData.append(k, formParams[k]));
    }
    return {
        uri: uri,
        api_version: '0.0',
        method: 'POST',
        api_client: '',
        formData
    };
}
exports.postRequestV0 = postRequestV0;
//# sourceMappingURL=post-request.js.map