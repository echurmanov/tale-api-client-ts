export function generateCsrf(): string {
    const alpha = '1234567890qazxswedcvfrtgbnhyujmkiolpQAZXSWEDCVFRTGBNHYUJMKIOLP';
    let token = '';
    for (let i = 0; i < 64; i++) {
        token += alpha[Math.floor(Math.random() * alpha.length)];
    }

    return token;
}
