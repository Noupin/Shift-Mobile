//Third Party Imports
import CookieManager from '@react-native-cookies/cookies';
import AsyncStorage from "@react-native-async-storage/async-storage"

//First Party Imports
import Base64 from "./Base64";


export function isTokenExpired(token: string) {
  const body = JSON.parse(Base64.atob(token.split('.')[1]));
  const now = Date.now() / 1000;
  const expiry = body.iat + body.exp;

  return now < expiry;
}

export async function setRefreshTokensFromCookies(){
  await CookieManager.getAll().then((cookies) => {
    var csrfValue = cookies['Feryvcsrftoken'] ? cookies['Feryvcsrftoken']['value'] : ""
    var refreshValue = cookies['Feryvrefreshtoken'] ? cookies['Feryvrefreshtoken']['value'] : ""

    AsyncStorage.setItem("Feryvcsrftoken", csrfValue)
    AsyncStorage.setItem("Feryvrefreshtoken", refreshValue)
  });
}
  