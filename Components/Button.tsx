//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

//First Party Imports
import { Neumorphic } from './Neumorphic';
import { ADDITIONAL_THEME_ATTRIBUTES } from '../constants';
import { booleanString } from '../Types/FrontEndTypes';


export interface IButton extends TouchableOpacityProps{
    onPress?: (event?: any) => void
}

export const FButton: FC<IButton> = ({children, onPress, style, ...props}) => {
  const theme = useTheme()
  const additionTheme = ADDITIONAL_THEME_ATTRIBUTES[String(theme.dark) as booleanString]


  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <Neumorphic style={[style]} backgroundColor={theme.colors.background}
      upperShadow={additionTheme.brightShadow} bottomShadow={additionTheme.dimShadow}>
        {children}
      </Neumorphic>
    </TouchableOpacity>
  );
}