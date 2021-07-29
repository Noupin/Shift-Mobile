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
import {
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface IndividualUserGetResponse
 */
export interface IndividualUserGetResponse {
    /**
     * 
     * @type {boolean}
     * @memberof IndividualUserGetResponse
     */
    owner: boolean;
    /**
     * 
     * @type {User}
     * @memberof IndividualUserGetResponse
     */
    user?: User;
}

export function IndividualUserGetResponseFromJSON(json: any): IndividualUserGetResponse {
    return IndividualUserGetResponseFromJSONTyped(json, false);
}

export function IndividualUserGetResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): IndividualUserGetResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'owner': json['owner'],
        'user': !exists(json, 'user') ? undefined : UserFromJSON(json['user']),
    };
}

export function IndividualUserGetResponseToJSON(value?: IndividualUserGetResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'owner': value.owner,
        'user': UserToJSON(value.user),
    };
}


