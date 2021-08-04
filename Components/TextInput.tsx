//Third Party Imports
import React, { FC, useState } from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { TextInput, TextInputProps, TextStyle, View } from 'react-native';

//First Party Imports
import { Neumorphic } from './Neumorphic';
import { ADDITIONAL_THEME_ATTRIBUTES } from '../constants';
import { booleanString } from '../Types/FrontEndTypes';


interface ITextInput extends TextInputProps{
  padding?: string | number
  alignText?: TextStyle['textAlign']
  style?: ViewStyle
}

export const FTextInput: FC<ITextInput> = ({placeholder, onChangeText, value, style,
  padding, alignText, placeholderTextColor, secureTextEntry, ...props}) => {
  const theme = useTheme()
  const additionalTheme = ADDITIONAL_THEME_ATTRIBUTES[String(theme.dark) as booleanString]

  const [hidden, setHidden] = useState(true)

  if(!placeholderTextColor){
    placeholderTextColor = additionalTheme.placeholderTextColor
  }

  return ( secureTextEntry ?
    <Neumorphic style={{...style, position: 'relative'}}>
      <TextInput {...props} placeholder={placeholder} onChangeText={onChangeText}
        value={value} placeholderTextColor={placeholderTextColor} secureTextEntry={hidden}
        style={{alignSelf: 'stretch', textAlign: alignText, padding: padding, color: theme.colors.text}}/>
      <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, marginRight: 10, justifyContent: 'center'}}>
        <Icon name={hidden ? "visibility" : "visibility-off"} type="material" color={theme.colors.text}
        onPress={() => setHidden(prev => !prev)}/>
      </View>
    </Neumorphic>
    :
    <Neumorphic style={{...style, position: 'relative'}}>
      <TextInput {...props} placeholder={placeholder} onChangeText={onChangeText}
        value={value} placeholderTextColor={placeholderTextColor} secureTextEntry={secureTextEntry}
        style={{alignSelf: 'stretch', textAlign: alignText, padding: padding, color: theme.colors.text}}/>
    </Neumorphic>
  );
}