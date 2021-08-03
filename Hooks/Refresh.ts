//Third Party Imports
import AsyncStorage from "@react-native-async-storage/async-storage"

//First Party Imports
import { AuthenticateAPIFactory } from "../Helpers/Api";
import { IElevatedStateProps } from "../Interfaces/ElevatedStateProps";
import { RefreshRequest } from '../Swagger';


export function useRefresh(setElevatedState: IElevatedStateProps["setElevatedState"],
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>): () => Promise<void>{
  
  async function fetchRefresh(){
    if(setLoading) setLoading(true);

    try{
      const csrfValue = await AsyncStorage.getItem("Feryvcsrftoken")
      const refreshValue = await AsyncStorage.getItem("Feryvrefreshtoken")

      const refreshTokens: RefreshRequest = {
        feryvcsrftoken: csrfValue!,
        feryvrefreshtoken: refreshValue!,
      }

      const response = await AuthenticateAPIFactory(`Bearer ${refreshValue!}`).refresh(refreshTokens)

      setElevatedState(prev => ({...prev, accessToken: response.accessToken!}))
    }
    catch(err){
      setElevatedState(prev => ({...prev, accessToken: "", authenticated: false}))
    }

    if(setLoading) setLoading(false);
  }

  return fetchRefresh
}
