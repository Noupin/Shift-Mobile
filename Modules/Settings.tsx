//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';


export const Settings: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const theme = useTheme()

  return (
    <View style={{flex: 1, alignItems: "center", marginHorizontal: 10}}>
      <FText>Settings</FText>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FText style={{flex: 1}}>Color Theme</FText>
        <Picker style={{flex: 1}} selectedValue={elevatedState.frontEndSettings.colorTheme}
        onValueChange={(value) => {
          setElevatedState(prev => ({...prev, frontEndSettings: 
            { ...prev.frontEndSettings, colorTheme: value}
          }))
        }}>
          <Picker.Item color={theme.colors.text} label="Light" value="light"/>
          <Picker.Item color={theme.colors.text} label="Dark" value="dark"/>
          <Picker.Item color={theme.colors.text} label="Adaptive" value="adaptive"/>
        </Picker>
      </View>
    </View>
  );
}
