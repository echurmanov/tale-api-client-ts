export function cookieParser(cookieSets: string[]): Record<string, string> {
    const list: Record<string, string> = {};

    if (cookieSets && typeof cookieSets.length !== 'undefined') {
        for(let i = 0; i < cookieSets.length; i++) {
            const rawCookie = cookieSets[i].split(';')[0].split('=');

            list[rawCookie[0]] = rawCookie[1];
        }
    }

    return list;
}
