"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCsrf = void 0;
function generateCsrf() {
    const alpha = '1234567890qazxswedcvfrtgbnhyujmkiolpQAZXSWEDCVFRTGBNHYUJMKIOLP';
    let token = '';
    for (let i = 0; i < 64; i++) {
        token += alpha[Math.floor(Math.random() * alpha.length)];
    }
    return token;
}
exports.generateCsrf = generateCsrf;
//# sourceMappingURL=csrf-token.js.map