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
 * @interface IndividualUserDeleteResponse
 */
export interface IndividualUserDeleteResponse {
    /**
     * 
     * @type {string}
     * @memberof IndividualUserDeleteResponse
     */
    msg?: string | null;
}

export function IndividualUserDeleteResponseFromJSON(json: any): IndividualUserDeleteResponse {
    return IndividualUserDeleteResponseFromJSONTyped(json, false);
}

export function IndividualUserDeleteResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): IndividualUserDeleteResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
    };
}

export function IndividualUserDeleteResponseToJSON(value?: IndividualUserDeleteResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'msg': value.msg,
    };
}


