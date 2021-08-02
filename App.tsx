/* To Fix Gradle Issues: cd android && ./gradlew clean && ./gradlew :app:bundleRelease && cd .. */

//Third Party Imports
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//First Party Imports
import { IElevatedState } from './Interfaces/ElevatedState';
import { DrawerNavigator } from './Modules/DrawerNavigator';
import { DARK_THEME, defaultShiftTitle, DEFAULT_USER, DEFUALT_FRONT_END_SETTINGS,
         isDarkMode, LIGHT_THEME } from './constants';
import { getFrontEndSettings, setFrontEndSettings } from './Helpers/FrontEndSettings';
import { currentUser, setAuthenticated, setCurrentUser } from './Helpers/User';
import { isTokenExpired } from './Helpers/Token';
import { ApiInstances } from './Helpers/Api';
import Base64 from './Helpers/Base64';
import { useRefresh } from './Hooks/Refresh';
import { navigationRef } from './Helpers/Navigation';
import { FButton } from './Components/Button';
import { Neumorphic } from './Components/Neumorphic';
import { FText } from './Components/Text';
import { MainStyles } from './Styles/MainStyles';
import { Template } from './Modules/Template';


export default function App() {
  const [elevatedState, setElevatedState] = useState<IElevatedState>({
    msg: "",
    authenticated: false,
    shiftUUID: "",
    shiftTitle: defaultShiftTitle,
    trainStatusInterval: 10,
    prebuiltShiftModel: "",
    accessToken: "",
    APIInstances: new ApiInstances(""),
    frontEndSettings: DEFUALT_FRONT_END_SETTINGS,
    currentUser: DEFAULT_USER,
  });

  const fetchRefresh = useRefresh(setElevatedState)
  const [showMsg, setShowMsg] = useState(false);


  useEffect(() => {
    if(!elevatedState.msg) return;

    setShowMsg(true);
  }, [elevatedState.msg]);

  useEffect(() => {
    async function initialFrontEnd(){
      const frontEndSettings = await getFrontEndSettings()
      setElevatedState(prev => ({...prev, frontEndSettings: frontEndSettings}))
    }

    async function initialUser(){
      const user = await currentUser()
      setElevatedState(prev => ({...prev, currentUser: user}))
    }

    initialFrontEnd()
    initialUser()
  }, [])

  useEffect(() => {
    if(!elevatedState.accessToken || elevatedState.accessToken.split('.').length < 3){
      setElevatedState(prev => ({...prev, authenticated: false}))
      elevatedState.APIInstances.apiKey = ""
      setAuthenticated(false)
      return;
    }
    

    const JWTBody = JSON.parse(Base64.atob(elevatedState.accessToken.split('.')[1]))
    if(JWTBody.user){
      setCurrentUser(JWTBody.user);
      setElevatedState(prev => ({...prev, currentUser: JWTBody.user}))
    }

    elevatedState.APIInstances.apiKey = elevatedState.accessToken
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
      {showMsg ?
      <SafeAreaView style={{backgroundColor: "#cce5ff", justifyContent: 'center', alignItems: 'center'}}>
        <Neumorphic style={[{ margin: 10, padding: 15, flexDirection: 'row',
        justifyContent: 'space-between', width: Dimensions.get('window').width*0.9}, MainStyles.borderRadius2]}>
          <View style={{flexShrink: 1}}>
            <FText>
              {elevatedState.msg}
            </FText>
          </View>
          <Neumorphic>
            <FButton onPress={() => {
              setShowMsg(false)
              setElevatedState((prev) => ({...prev, msg: ""}))
            }} style={[{padding: 10}, MainStyles.borderRadius2]}>
              <FText>Close</FText>
            </FButton>
          </Neumorphic>
        </Neumorphic> 
      </SafeAreaView>: null}
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
