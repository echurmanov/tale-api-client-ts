"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHttps = exports.requestHttp = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const querystring_1 = __importDefault(require("querystring"));
const csrf_token_1 = require("../utils/csrf-token");
function buildBaseApiUrl(request) {
    const baseParams = {
        api_client: request.api_client,
        api_version: request.api_version
    };
    return `${request.uri}?${querystring_1.default.encode(baseParams)}`;
}
function requestHttp(host, client, apiRequest, credentials, debug = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return request(host, client, http_1.default, apiRequest, credentials, debug);
    });
}
exports.requestHttp = requestHttp;
function requestHttps(host, client, apiRequest, credentials, debug = false) {
    return __awaiter(this, void 0, void 0, function* () {
        return request(host, client, https_1.default, apiRequest, credentials, debug);
    });
}
exports.requestHttps = requestHttps;
function request(host, client, transport, apiRequest, credentials, debug = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield requestRaw(host, client, https_1.default, apiRequest, credentials, debug);
        try {
            const parsedBody = JSON.parse(res.body);
            return {
                headers: res.headers,
                response: parsedBody
            };
        }
        catch (e) {
            throw new Error("Error on parse server response. Not JSON: " + res.body);
        }
    });
}
function requestRaw(host, client, transport, apiRequest, credentials, debug = false) {
    return new Promise((success, reject) => {
        const { csrfToken = csrf_token_1.generateCsrf(), sessionId = csrf_token_1.generateCsrf() } = credentials || {};
        const extraParams = apiRequest.method === 'GET' ? { '_': (new Date()).getTime() } : {};
        const encodedGetData = querystring_1.default.encode(Object.assign(Object.assign({}, apiRequest.getParams), extraParams));
        const encodedPostData = querystring_1.default.encode(Object.assign({}, apiRequest.postParams));
        const path = buildBaseApiUrl(Object.assign(Object.assign({}, apiRequest), { api_client: client })) +
            (encodedGetData ? `&${encodedGetData}` : '');
        const options = {
            host: host,
            path,
            method: apiRequest.method === 'POST' ? 'POST' : 'GET',
            headers: {
                Referer: 'https://' + host,
                Cookie: `csrftoken=${csrfToken}; sessionid=${sessionId}`,
                'x-csrftoken': csrfToken
            }
        };
        if (apiRequest.formData) {
            options.headers = Object.assign(Object.assign({}, options.headers), apiRequest.formData.getHeaders());
        }
        else if (options.method === 'POST') {
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
            options.headers['content-length'] = Buffer.from(encodedPostData).length;
        }
        if (debug) {
            console.log(options);
        }
        const req = transport.request(options, (response) => {
            const chunks = [];
            response.on('data', (chunk) => {
                chunks.push(chunk);
            });
            response.on('end', () => {
                success({
                    headers: response.headers,
                    body: Buffer.concat(chunks).toString('utf-8')
                });
            });
        });
        req.on('error', reject);
        if (options.method === 'POST' && encodedPostData) {
            req.write(encodedPostData);
        }
        if (apiRequest.formData) {
            apiRequest.formData.pipe(req);
        }
        else {
            req.end();
        }
    });
}
//# sourceMappingURL=base-request.js.map