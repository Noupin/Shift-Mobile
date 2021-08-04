//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { FButton } from '../Components/Button';
import { MainStyles } from '../Styles/MainStyles';
import { COLOR_THEME_COLORS, COLOR_THEME_ICON, COLOR_THEME_ICON_TYPE,
  NEXT_COLOR_THEME } from '../constants';
import { Neumorphic } from '../Components/Neumorphic';


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
      <FText style={{marginBottom: 15, fontWeight: 'bold', fontSize: 25}}>Settings</FText>
      <Neumorphic style={{flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 15}}>
        <FText style={{flex: 1}}>Color Theme</FText>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 5}}>
          <FButton style={{...MainStyles.borderRadiusC, padding: 5}} onPress={() => {
            setElevatedState(prev => ({...prev, frontEndSettings: 
              { ...prev.frontEndSettings, colorTheme: NEXT_COLOR_THEME[prev.frontEndSettings.colorTheme]}
            }))
          }}>
            <Icon name={getColorThemeIcon()} type={COLOR_THEME_ICON_TYPE[elevatedState.frontEndSettings.colorTheme]}
              color={getColorThemeIconColor()}/>
          </FButton>
        </View>
      </Neumorphic>
    </View>
  );
}
