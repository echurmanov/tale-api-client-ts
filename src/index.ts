import {requestHttps} from "./api/base-request";
import { getInfoRequestV1, IApiInfoResponse } from "./api/get-info";


requestHttps('the-tale.org', 'CrazyNigerTS-0.1.0', getInfoRequestV1(6014))
    .then((response) => {
        console.log("Headers", response.headers);
        console.log("response", response.response);

        const res: IApiInfoResponse = (response.response as IApiInfoResponse);
    })
    .catch(err => console.error(err));