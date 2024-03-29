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
    Shift,
    ShiftFromJSON,
    ShiftFromJSONTyped,
    ShiftToJSON,
} from './';

/**
 * 
 * @export
 * @interface PopularShiftsResponse
 */
export interface PopularShiftsResponse {
    /**
     * 
     * @type {Array<Shift>}
     * @memberof PopularShiftsResponse
     */
    shifts?: Array<Shift>;
}

export function PopularShiftsResponseFromJSON(json: any): PopularShiftsResponse {
    return PopularShiftsResponseFromJSONTyped(json, false);
}

export function PopularShiftsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PopularShiftsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'shifts': !exists(json, 'shifts') ? undefined : ((json['shifts'] as Array<any>).map(ShiftFromJSON)),
    };
}

export function PopularShiftsResponseToJSON(value?: PopularShiftsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'shifts': value.shifts === undefined ? undefined : ((value.shifts as Array<any>).map(ShiftToJSON)),
    };
}


