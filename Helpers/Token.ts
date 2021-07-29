//First Party Imports
import Base64 from "./Base64";


export function isTokenExpired(token: string) {
    const body = JSON.parse(Base64.atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    const expiry = body.iat + body.exp;
  
    return now < expiry;
  }
  