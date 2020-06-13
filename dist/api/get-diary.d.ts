import { IRequest } from "../types/request";
import { TApiSuccessResponse } from "../types/response";
import { IDiaryMessage } from "../types/game-entities";
export interface IApiDiaryResponse extends TApiSuccessResponse {
    data: {
        "version": number;
        "messages": IDiaryMessage[];
    };
}
export declare function getDiaryRequestV1(): IRequest;
