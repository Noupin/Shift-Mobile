//First Party Imports
import { ApiInstances } from "../Helpers/Api";
import { User } from "../Swagger";
import { IFrontEndSettings } from "./FrontEndSettings";


export interface IElevatedState{
    msg: string
    authenticated: boolean
    shiftUUID: string
    shiftTitle: string
    trainStatusInterval: number
    prebuiltShiftModel: string
    accessToken: string
    APIInstaces: ApiInstances
    frontEndSettings: IFrontEndSettings
    currentUser: User
}
