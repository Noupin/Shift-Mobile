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
 * @interface ForgotPasswordRequest
 */
export interface ForgotPasswordRequest {
    /**
     * 
     * @type {string}
     * @memberof ForgotPasswordRequest
     */
    email: string;
}

export function ForgotPasswordRequestFromJSON(json: any): ForgotPasswordRequest {
    return ForgotPasswordRequestFromJSONTyped(json, false);
}

export function ForgotPasswordRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ForgotPasswordRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
    };
}

export function ForgotPasswordRequestToJSON(value?: ForgotPasswordRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
    };
}


