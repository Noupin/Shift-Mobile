//Third Party Imports
import AsyncStorage from "@react-native-async-storage/async-storage"

//First Party Imports
import { DEFUALT_FRONT_END_SETTINGS } from "../constants"
import { IFrontEndSettings } from "../Interfaces/FrontEndSettings"
import Base64 from "./Base64"


export async function getFrontEndSettings(): Promise<IFrontEndSettings>{
  const encodedSettings = await AsyncStorage.getItem("frontEndSettings")!
  if(!encodedSettings) return DEFUALT_FRONT_END_SETTINGS

  const decodedSettings = Base64.atob(encodedSettings)

  if(decodedSettings === JSON.stringify({}) || decodedSettings === "undefined") return DEFUALT_FRONT_END_SETTINGS
  try{
    const settings: IFrontEndSettings = JSON.parse(decodedSettings)
    if(!settings) return DEFUALT_FRONT_END_SETTINGS

    return settings
  }
  catch{
    return DEFUALT_FRONT_END_SETTINGS
  }
}

export function setFrontEndSettings(value: IFrontEndSettings){
  const jsonStrValue = JSON.stringify(value);
  const encodedValue = Base64.btoa(jsonStrValue)

  AsyncStorage.setItem("frontEndSettings", encodedValue)
}