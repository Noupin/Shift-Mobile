//Third Party Imports
import React, { FC } from 'react';
import { ViewProps, ViewStyle } from 'react-native'
import 'react-native-gesture-handler';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

//First Party Imports
import { Neumorphic } from './Neumorphic';


export interface IButton extends TouchableOpacityProps{
    onPress?: (event?: any) => void
    style: ViewStyle
}

export const FButton: FC<IButton> = ({children, onPress, style, ...props}) => {

  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <Neumorphic style={style}>
        {children}
      </Neumorphic>
    </TouchableOpacity>
  );
}