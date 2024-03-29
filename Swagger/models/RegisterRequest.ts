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
 * @interface RegisterRequest
 */
export interface RegisterRequest {
    /**
     * 
     * @type {string}
     * @memberof RegisterRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterRequest
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterRequest
     */
    username: string;
}

export function RegisterRequestFromJSON(json: any): RegisterRequest {
    return RegisterRequestFromJSONTyped(json, false);
}

export function RegisterRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
        'username': json['username'],
    };
}

export function RegisterRequestToJSON(value?: RegisterRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
        'username': value.username,
    };
}


