//Third Party Imports
import AsyncStorage from "@react-native-async-storage/async-storage"

//First Party Imports
import Base64 from "./Base64";
import { User } from "../Swagger";
import { DEFAULT_USER } from '../constants'


export async function currentUser(): Promise<User>{
  const encodedUser = await AsyncStorage.getItem("user")!
  if(!encodedUser) return DEFAULT_USER

  const decodedUser = Base64.atob(encodedUser)

  if(decodedUser === JSON.stringify({}) || decodedUser === "undefined") return DEFAULT_USER
  try{
    const user: User = JSON.parse(decodedUser)
    if(!user) return DEFAULT_USER

    return user
  }
  catch{
    return DEFAULT_USER
  }
}

export function setCurrentUser(value: any){
  const jsonStrValue = JSON.stringify(value);
  const encodedValue = Base64.btoa(jsonStrValue)

  AsyncStorage.setItem("user", encodedValue)
}


export async function isAuthenticated(): Promise<boolean>{
  const authString = await AsyncStorage.getItem("authenticated")!
  return authString === 'true';
}

export function setAuthenticated(auth: boolean){
  const authString = `${auth}`
  AsyncStorage.setItem("authenticated", authString)
}
