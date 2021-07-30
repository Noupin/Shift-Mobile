//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { TextProps, Text } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';


interface IText extends TextProps{}

export const FText: FC<IText> = ({children, style, ...props}) => {
  const theme = useTheme()
  var textColor = theme.colors.text

  return (
    <Text {...props} style={[style, {color: theme.colors.text}]}>
      {children}
    </Text>
  );
}