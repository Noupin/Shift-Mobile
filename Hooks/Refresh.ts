//Third Party Imports
import CookieManager from '@react-native-cookies/cookies';

//First Party Imports
import { AuthenticateAPIFactory } from "../Helpers/Api";
import { IElevatedStateProps } from "../Interfaces/ElevatedStateProps";


export function useRefresh(setElevatedState: IElevatedStateProps["setElevatedState"],
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>): () => Promise<void>{
  
  async function fetchRefresh(){
    CookieManager.getAll()
    .then((cookies) => {
      console.log('CookieManager.getAll =>', cookies);
    });
    if(setLoading) setLoading(true);

    try{
      const response = await AuthenticateAPIFactory("").refresh()

      setElevatedState(prev => ({...prev, accessToken: response.accessToken!}))
    }
    catch{
      setElevatedState(prev => ({...prev, accessToken: "", authenticated: false}))
    }

    if(setLoading) setLoading(false);
  }

  return fetchRefresh
}
