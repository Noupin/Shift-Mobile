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


import * as runtime from '../runtime';
import {
    ChangePasswordRequest,
    ChangePasswordRequestFromJSON,
    ChangePasswordRequestToJSON,
    ChangePasswordResponse,
    ChangePasswordResponseFromJSON,
    ChangePasswordResponseToJSON,
    ForgotPasswordRequest,
    ForgotPasswordRequestFromJSON,
    ForgotPasswordRequestToJSON,
    ForgotPasswordResponse,
    ForgotPasswordResponseFromJSON,
    ForgotPasswordResponseToJSON,
    IndividualUserDeleteResponse,
    IndividualUserDeleteResponseFromJSON,
    IndividualUserDeleteResponseToJSON,
    IndividualUserGetResponse,
    IndividualUserGetResponseFromJSON,
    IndividualUserGetResponseToJSON,
    IndividualUserPatchRequest,
    IndividualUserPatchRequestFromJSON,
    IndividualUserPatchRequestToJSON,
    IndividualUserPatchResponse,
    IndividualUserPatchResponseFromJSON,
    IndividualUserPatchResponseToJSON,
    ResetPasswordRequest,
    ResetPasswordRequestFromJSON,
    ResetPasswordRequestToJSON,
    ResetPasswordResponse,
    ResetPasswordResponseFromJSON,
    ResetPasswordResponseToJSON,
    UpdatePictureResponse,
    UpdatePictureResponseFromJSON,
    UpdatePictureResponseToJSON,
    UserShiftsResponse,
    UserShiftsResponseFromJSON,
    UserShiftsResponseToJSON,
} from '../models';

export interface ChangePasswordOperationRequest {
    body?: ChangePasswordRequest;
}

export interface DeleteIndivdualUserRequest {
    username: string;
}

export interface ForgotPasswordOperationRequest {
    body?: ForgotPasswordRequest;
}

export interface GetIndivdualUserRequest {
    username: string;
}

export interface PatchIndivdualUserRequest {
    username: string;
    body?: IndividualUserPatchRequest;
}

export interface ResetPasswordOperationRequest {
    token: string;
    body?: ResetPasswordRequest;
}

export interface UpdatePictureRequest {
    requestFile: Blob;
}

export interface UserShiftsRequest {
    username: string;
}

/**
 * 
 */
export class UserApi extends runtime.BaseAPI {

    /**
     * Updates/modifies users password.
     */
    async changePasswordRaw(requestParameters: ChangePasswordOperationRequest): Promise<runtime.ApiResponse<ChangePasswordResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/user/changePassword`,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ChangePasswordRequestToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ChangePasswordResponseFromJSON(jsonValue));
    }

    /**
     * Updates/modifies users password.
     */
    async changePassword(requestParameters: ChangePasswordOperationRequest): Promise<ChangePasswordResponse> {
        const response = await this.changePasswordRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes the queried user.
     */
    async deleteIndivdualUserRaw(requestParameters: DeleteIndivdualUserRequest): Promise<runtime.ApiResponse<IndividualUserDeleteResponse>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling deleteIndivdualUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/user/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IndividualUserDeleteResponseFromJSON(jsonValue));
    }

    /**
     * Deletes the queried user.
     */
    async deleteIndivdualUser(requestParameters: DeleteIndivdualUserRequest): Promise<IndividualUserDeleteResponse> {
        const response = await this.deleteIndivdualUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates/modifies users password.
     */
    async forgotPasswordRaw(requestParameters: ForgotPasswordOperationRequest): Promise<runtime.ApiResponse<ForgotPasswordResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/user/forgotPassword`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ForgotPasswordRequestToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ForgotPasswordResponseFromJSON(jsonValue));
    }

    /**
     * Updates/modifies users password.
     */
    async forgotPassword(requestParameters: ForgotPasswordOperationRequest): Promise<ForgotPasswordResponse> {
        const response = await this.forgotPasswordRaw(requestParameters);
        return await response.value();
    }

    /**
     * The queried user.
     */
    async getIndivdualUserRaw(requestParameters: GetIndivdualUserRequest): Promise<runtime.ApiResponse<IndividualUserGetResponse>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling getIndivdualUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/user/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IndividualUserGetResponseFromJSON(jsonValue));
    }

    /**
     * The queried user.
     */
    async getIndivdualUser(requestParameters: GetIndivdualUserRequest): Promise<IndividualUserGetResponse> {
        const response = await this.getIndivdualUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates/modifies the queried user.
     */
    async patchIndivdualUserRaw(requestParameters: PatchIndivdualUserRequest): Promise<runtime.ApiResponse<IndividualUserPatchResponse>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling patchIndivdualUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/user/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: IndividualUserPatchRequestToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => IndividualUserPatchResponseFromJSON(jsonValue));
    }

    /**
     * Updates/modifies the queried user.
     */
    async patchIndivdualUser(requestParameters: PatchIndivdualUserRequest): Promise<IndividualUserPatchResponse> {
        const response = await this.patchIndivdualUserRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates/modifies users password.
     */
    async resetPasswordRaw(requestParameters: ResetPasswordOperationRequest): Promise<runtime.ApiResponse<ResetPasswordResponse>> {
        if (requestParameters.token === null || requestParameters.token === undefined) {
            throw new runtime.RequiredError('token','Required parameter requestParameters.token was null or undefined when calling resetPassword.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/user/resetPassword/{token}`.replace(`{${"token"}}`, encodeURIComponent(String(requestParameters.token))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ResetPasswordRequestToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ResetPasswordResponseFromJSON(jsonValue));
    }

    /**
     * Updates/modifies users password.
     */
    async resetPassword(requestParameters: ResetPasswordOperationRequest): Promise<ResetPasswordResponse> {
        const response = await this.resetPasswordRaw(requestParameters);
        return await response.value();
    }

    /**
     * Changes the users profile picture to the uploaded picture.
     */
    async updatePictureRaw(requestParameters: UpdatePictureRequest): Promise<runtime.ApiResponse<UpdatePictureResponse>> {
        if (requestParameters.requestFile === null || requestParameters.requestFile === undefined) {
            throw new runtime.RequiredError('requestFile','Required parameter requestParameters.requestFile was null or undefined when calling updatePicture.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.requestFile !== undefined) {
            formParams.append('requestFile', requestParameters.requestFile as any);
        }

        const response = await this.request({
            path: `/api/user/data/updatePicture`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UpdatePictureResponseFromJSON(jsonValue));
    }

    /**
     * Changes the users profile picture to the uploaded picture.
     */
    async updatePicture(requestParameters: UpdatePictureRequest): Promise<UpdatePictureResponse> {
        const response = await this.updatePictureRaw(requestParameters);
        return await response.value();
    }

    /**
     * The shifts associated with the queried user.
     */
    async userShiftsRaw(requestParameters: UserShiftsRequest): Promise<runtime.ApiResponse<UserShiftsResponse>> {
        if (requestParameters.username === null || requestParameters.username === undefined) {
            throw new runtime.RequiredError('username','Required parameter requestParameters.username was null or undefined when calling userShifts.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/user/{username}/shifts`.replace(`{${"username"}}`, encodeURIComponent(String(requestParameters.username))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserShiftsResponseFromJSON(jsonValue));
    }

    /**
     * The shifts associated with the queried user.
     */
    async userShifts(requestParameters: UserShiftsRequest): Promise<UserShiftsResponse> {
        const response = await this.userShiftsRaw(requestParameters);
        return await response.value();
    }

}
