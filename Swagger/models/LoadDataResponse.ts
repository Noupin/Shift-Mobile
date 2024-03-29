/* tslint:disable */
/* eslint-disable */
/**
 * Shift
 * Shift Server API documentation
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LoadDataResponse
 */
export interface LoadDataResponse {
    /**
     * 
     * @type {string}
     * @memberof LoadDataResponse
     */
    msg?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LoadDataResponse
     */
    shiftUUID?: string;
}

export function LoadDataResponseFromJSON(json: any): LoadDataResponse {
    return LoadDataResponseFromJSONTyped(json, false);
}

export function LoadDataResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoadDataResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
        'shiftUUID': !exists(json, 'shiftUUID') ? undefined : json['shiftUUID'],
    };
}

export function LoadDataResponseToJSON(value?: LoadDataResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'msg': value.msg,
        'shiftUUID': value.shiftUUID,
    };
}


