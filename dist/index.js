"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_request_1 = require("./api/base-request");
const get_info_1 = require("./api/get-info");
base_request_1.requestHttps('the-tale.org', 'CrazyNigerTS-0.1.0', get_info_1.getInfoRequestV1(6014))
    .then((response) => {
    console.log("Headers", response.headers);
    console.log("response", response.response);
    const res = response.response;
})
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map