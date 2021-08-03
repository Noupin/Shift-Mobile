//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { FButton } from '../Components/Button';
import { colorThemeTypeArray } from '../Types/FrontEndTypes';
import { COLOR_THEME_COLORS, COLOR_THEME_ICON, COLOR_THEME_ICON_TYPE, NEXT_COLOR_THEME } from '../constants';
import { MainStyles } from '../Styles/MainStyles';


export const Settings: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const theme = useTheme()

  function getColorThemeIcon(){
    return COLOR_THEME_ICON[elevatedState.frontEndSettings.colorTheme]
  }

  function getColorThemeIconColor(){
    if(elevatedState.frontEndSettings.colorTheme === 'adaptive'){
      return theme.colors.text
    }
    else{
      return COLOR_THEME_COLORS[elevatedState.frontEndSettings.colorTheme]
    }
  }

  return (
    <View style={{flex: 1, alignItems: "center", marginHorizontal: 10}}>
      <FText>Settings</FText>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FText style={{flex: 1}}>Color Theme</FText>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <FButton style={[MainStyles.borderRadiusC, {padding: 5}]} onPress={() => {
            setElevatedState(prev => ({...prev, frontEndSettings: 
              { ...prev.frontEndSettings, colorTheme: NEXT_COLOR_THEME[prev.frontEndSettings.colorTheme]}
            }))
          }}>
            <Icon name={getColorThemeIcon()} type={COLOR_THEME_ICON_TYPE[elevatedState.frontEndSettings.colorTheme]}
              color={getColorThemeIconColor()}/>
          </FButton>
        </View>
      </View>
    </View>
  );
}
