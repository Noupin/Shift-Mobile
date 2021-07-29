//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { TextInput, TextInputProps } from 'react-native';

//First Party Imports
import { Neumorphic } from './Neumorphic';
import { ADDITIONAL_THEME_ATTRIBUTES } from '../constants';
import { booleanString } from '../Types/FrontEndTypes';


interface ITextInput extends TextInputProps{
  padding?: string | number
  alignText?: "left" | "center" | "right" | "auto" | "justify"
}

export const FTextInput: FC<ITextInput> = ({placeholder, onChangeText, value, style,
  padding, alignText, placeholderTextColor, ...props}) => {
  const theme = useTheme()
  const additionTheme = ADDITIONAL_THEME_ATTRIBUTES[String(theme.dark) as booleanString]

  if(!placeholderTextColor){
    placeholderTextColor = additionTheme.placeholderTextColor
  }

  return (
    <Neumorphic style={style} backgroundColor={theme.colors.background}
    upperShadow={additionTheme.brightShadow} bottomShadow={additionTheme.dimShadow}>
      <TextInput {...props} placeholder={placeholder} onChangeText={onChangeText}
        value={value} placeholderTextColor={placeholderTextColor}
        style={{alignSelf: 'stretch', textAlign: alignText, padding: padding}}/>
    </Neumorphic>
  );
}