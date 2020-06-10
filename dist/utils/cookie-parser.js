"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieParser = void 0;
function cookieParser(cookieSets) {
    const list = {};
    if (cookieSets && typeof cookieSets.length !== 'undefined') {
        for (let i = 0; i < cookieSets.length; i++) {
            const rawCookie = cookieSets[i].split(';')[0].split('=');
            list[rawCookie[0]] = rawCookie[1];
        }
    }
    return list;
}
exports.cookieParser = cookieParser;
//# sourceMappingURL=cookie-parser.js.map