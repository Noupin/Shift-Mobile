//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { View, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';

//First Party Imports
import { DrawerStyles } from '../Styles/DrawerStyles';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from './Text';


interface ICustomDrawer extends IElevatedStateProps, DrawerContentComponentProps<DrawerContentOptions>{}

export const LowerNavComponent: FC<ICustomDrawer> = ({elevatedState, setElevatedState, navigation}) => {
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
        <TouchableOpacity onPress={() => {}}>
          <FText style={DrawerStyles.button}>Logout</FText>
        </TouchableOpacity>
      </View>
    )
  }

  return navComp
}