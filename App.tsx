//Third Party Imports
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//First Party Imports
import { IElevatedState } from './Interfaces/ElevatedState';
import { DrawerNavigator } from './Modules/DrawerNavigator';
import { DARK_THEME, defaultShiftTitle, DEFUALT_FRONT_END_SETTINGS,
         isDarkMode, LIGHT_THEME } from './constants';
import { StatusBar } from 'react-native';
import { getFrontEndSettings, setFrontEndSettings } from './Helpers/FrontEndSettings';
import { setAuthenticated, setCurrentUser } from './Helpers/User';
import { isTokenExpired } from './Helpers/Token';
import { ApiInstances } from './Helpers/Api';
import Base64 from './Helpers/Base64';
import { useRefresh } from './Hooks/Refresh';
import { navigationRef } from './Helpers/Navigation';


export default function App() {
  const [elevatedState, setElevatedState] = useState<IElevatedState>({
    msg: "",
    authenticated: false,
    shiftUUID: "",
    shiftTitle: defaultShiftTitle,
    trainStatusInterval: 10,
    prebuiltShiftModel: "",
    accessToken: "",
    APIInstaces: new ApiInstances(""),
    frontEndSettings: DEFUALT_FRONT_END_SETTINGS,
  });

  const fetchRefresh = useRefresh(setElevatedState)


  useEffect(() => {
    async function initialFrontEnd(){
      const frontEndSettings = await getFrontEndSettings()
      setElevatedState(prev => ({...prev, frontEndSettings: frontEndSettings}))
    }

    initialFrontEnd()
  }, [])

  useEffect(() => {
    if(!elevatedState.accessToken || elevatedState.accessToken.split('.').length < 3){
      setElevatedState(prev => ({...prev, authenticated: false}))
      elevatedState.APIInstaces.apiKey = ""
      setAuthenticated(false)
      return;
    }
    

    const JWTBody = JSON.parse(Base64.atob(elevatedState.accessToken.split('.')[1]))
    if(JWTBody.user) setCurrentUser(JWTBody.user);

    elevatedState.APIInstaces.apiKey = elevatedState.accessToken
    var authenticated = isTokenExpired(elevatedState.accessToken)
    setAuthenticated(authenticated)
    setElevatedState(prev => ({...prev,
                               authenticated: authenticated}))
  }, [elevatedState.accessToken])

  useEffect(() => {
    if(elevatedState.authenticated) return;

    fetchRefresh()
  }, [elevatedState.authenticated])

  useEffect(() => {
    if(elevatedState.frontEndSettings === DEFUALT_FRONT_END_SETTINGS) return;

    setFrontEndSettings(elevatedState.frontEndSettings)
  }, [elevatedState.frontEndSettings])

  return (
    <>
      <StatusBar barStyle={isDarkMode[elevatedState.frontEndSettings.colorTheme]() ? 'light-content' : 'dark-content'} translucent={true}/>
      <SafeAreaProvider>
        <AppearanceProvider>
          <NavigationContainer ref={navigationRef}
          theme={isDarkMode[elevatedState.frontEndSettings.colorTheme]() ? DARK_THEME : LIGHT_THEME}>
            <DrawerNavigator elevatedState={elevatedState} setElevatedState={setElevatedState}/>
          </NavigationContainer>
        </AppearanceProvider>
      </SafeAreaProvider>
    </>
  );
}
