"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const API = __importStar(require("../api"));
const api_1 = require("../api");
const response_1 = require("../types/response");
const cookie_parser_1 = require("../utils/cookie-parser");
const csrf_token_1 = require("../utils/csrf-token");
const game_entities_1 = require("../types/game-entities");
class Client {
    constructor(client, host = 'the-tale.org', protocol = 'https', credentials, debug = false) {
        this.client = client;
        this.host = host;
        this.protocol = protocol;
        this.credentials = credentials;
        this.debug = debug;
        this.request = protocol === 'https' ? API.requestHttps : API.requestHttp;
    }
    updateCredentialByResponseHeaders(headers) {
        if (headers['set-cookie']) {
            const cookies = cookie_parser_1.cookieParser(headers['set-cookie']);
            const newCreds = this.credentials ? this.credentials : { csrfToken: csrf_token_1.generateCsrf() };
            if (cookies['sessionid']) {
                newCreds.sessionId = cookies['sessionid'];
            }
            if (cookies['csrftoken']) {
                newCreds.csrfToken = cookies['csrftoken'];
            }
            this.credentials = newCreds;
        }
    }
    getCredentials() {
        return Object.assign({}, this.credentials);
    }
    getAccountInfo(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!accountId && (!this.credentials || !this.credentials.accountId)) {
                throw new Error("Нужно быть авторизованыи или передать accountId");
            }
            const { headers, response } = yield this.request(this.host, this.client, API.getAccountInfoRequestV1(accountId || this.credentials.accountId), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    getAuthorisationState() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.getAuthorisationStateV1(), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                this.updateCredentialByResponseHeaders(headers);
                if (response.data.state === api_1.AUTH_STATE.SUCCESS) {
                    this.credentials.accountId = response.data.account_id;
                }
                return response;
            }
            throw response;
        });
    }
    login(email, password, remember = false, nextUrl = '/') {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.loginV1(email, password, remember, nextUrl), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                this.updateCredentialByResponseHeaders(headers);
                if (response.data.state === api_1.AUTH_STATE.SUCCESS) {
                    this.credentials.accountId = response.data.account_id;
                }
                return response;
            }
            throw response;
        });
    }
    getCardsList() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.getCardsRequestV2(), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    getDiary() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.getDiaryRequestV1(), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    getGameInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.getGameInfoRequestV1(), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    getInfo(accountId, clientTurns) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!accountId && !this.credentials) {
                throw new Error("Нужно быть авторизованыи или передать accountId");
            }
            const { headers, response } = yield this.request(this.host, this.client, API.getInfoRequestV1v9(accountId, clientTurns), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                if (!response.data.account) {
                    throw new Error("Account not found or wrong credentials");
                }
                return response;
            }
            throw response;
        });
    }
    getPlacesList() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.getPlacesListRequestV1v1(), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    getRegion() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.getRegionRequestV0v1(), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    moveCardsToHand(cards) {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.moveCardToHandV2(cards), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    moveCardsToStorage(cards) {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.moveCardToStorageV2(cards), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    receiveCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.receiveCardsV1(), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    requestAuthorisation(appName, description, requestInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.requestAuthorisationV1(appName, description, requestInfo), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                this.updateCredentialByResponseHeaders(headers);
                return response;
            }
            throw response;
        });
    }
    shopSellCard(cards, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.shopSellCardV0(cards, price), this.credentials, this.debug);
            if (response_1.successResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    useCard(cardId, value, clanName, clanAbbr) {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.useCardV2(cardId, value, clanName, clanAbbr), this.credentials, this.debug);
            if (response_1.processingResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
    useHelp() {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers, response } = yield this.request(this.host, this.client, API.useAbilityV1(game_entities_1.EAbilities.help), this.credentials, this.debug);
            if (response_1.processingResponseTypeGuard(response)) {
                return response;
            }
            throw response;
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=index.js.map