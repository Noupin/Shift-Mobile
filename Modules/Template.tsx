//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions } from '@react-navigation/native';

//First Party Imports
import { FButton } from '../Components/Button';
import { MainStyles } from '../Styles/MainStyles';
import { HeaderBarStyle } from '../Styles/HeaderBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isDarkMode, TOP_BAR_SIZE } from '../constants';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { useTheme } from '@react-navigation/native';
import { navigate, navigationRef } from '../Helpers/Navigation';


interface ITemplate extends IElevatedStateProps{}

export const Template: FC<ITemplate> = ({ children, elevatedState }) => {
  const theme = useTheme()


  return (
    <SafeAreaView style={[MainStyles.container, {width: "100%"}]}>
      <View style={[MainStyles.container, {width: "100%"}]}>
        <View style={HeaderBarStyle.container}>
          <FButton style={{...MainStyles.borderRadiusC, padding: 5}}
          onPress={() => navigationRef.current?.dispatch(DrawerActions.openDrawer())}>
            <Icon name='menu' size={20} color={theme.colors.text}/>
          </FButton>
          <TouchableOpacity onPress={() => navigate("Home", {startLoading: false})}>
            <Image style={{height: TOP_BAR_SIZE, width: TOP_BAR_SIZE}}
              source={isDarkMode[elevatedState.frontEndSettings.colorTheme]() ?
              require('../assets/darkIcon.png') : require('../assets/lightIcon.png')}/>
          </TouchableOpacity>
          <FButton style={{...MainStyles.borderRadiusC, padding: 5}}
          onPress={() => navigate("Settings")}>
            <Icon name='settings' size={20} color={theme.colors.text}/>
          </FButton>
        </View>
        <View style={[MainStyles.container, {justifyContent: 'space-between'}]}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}
