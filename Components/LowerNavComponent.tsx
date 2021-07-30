//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { View, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';

//First Party Imports
import { DrawerStyles } from '../Styles/DrawerStyles';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from './Text';
import { useFetch } from '../Hooks/Fetch';
import { LogoutResponse } from '../Swagger';


interface ICustomDrawer extends IElevatedStateProps, DrawerContentComponentProps<DrawerContentOptions>{}

export const LowerNavComponent: FC<ICustomDrawer> = ({elevatedState, setElevatedState, navigation}) => {
  const [fetching, setFetching] = useState(false);
  const [logoutResponse, setLogoutResponse] = useState<LogoutResponse>();
  const fetchLogout = useFetch(elevatedState.APIInstances.Authenticate,
                               elevatedState.APIInstances.Authenticate.logout,
                               elevatedState, setElevatedState, setLogoutResponse, setFetching)


  useEffect(() => {
    if(!fetching) return;

    fetchLogout()
  }, [fetching]);

  useEffect(() => {
    if (!logoutResponse) return;

    setElevatedState((prev) => ({...prev, msg: logoutResponse.msg!, accessToken: "", authenticated: false}))
    navigation.navigate("Home")
  }, [logoutResponse]);


  let navComp = (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <FText style={DrawerStyles.button}>Login</FText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <FText style={DrawerStyles.button}>Register</FText>
      </TouchableOpacity>
    </View>
  )

  if(elevatedState.authenticated){
    navComp = (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <FText style={DrawerStyles.button}>Settings</FText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFetching(true)}>
          <FText style={DrawerStyles.button}>Logout</FText>
        </TouchableOpacity>
      </View>
    )
  }

  return navComp
}