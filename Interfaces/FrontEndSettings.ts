//First Party Imports
import { colorThemeType, trainViewType, uiStyleType } from '../Types/FrontEndTypes'


export interface IFrontEndSettings{
    usePTM: boolean
    trainingShift: boolean
    trainView: trainViewType
    colorTheme: colorThemeType
    uiStyle: uiStyleType
}
