//Third Party Imports
import React, { FC } from "react";
import { View } from "react-native";
import { ViewProps } from "react-native";
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

//First Party Imports
import { ADDITIONAL_THEME_ATTRIBUTES } from "../constants";
import { booleanString } from "../Types/FrontEndTypes";


interface INeurmorphic extends ViewProps{
  radius?: number
  offset?: number
  backgroundColor?: string
  upperShadow?: string
  bottomShadow?: string
  includeTheme?: boolean
}


export const Neumorphic: FC<INeurmorphic> = ({children, style, radius=5, offset=5, includeTheme=true,
  backgroundColor='#ececec', upperShadow='rgba(255, 255, 255, 0.4)', bottomShadow='rgba(0, 0, 0, 0.05)'}) => {
  const theme = useTheme()

  if(includeTheme){
    const additionTheme = ADDITIONAL_THEME_ATTRIBUTES[String(theme.dark) as booleanString]
    backgroundColor = theme.colors.background
    upperShadow = additionTheme.brightShadow
    bottomShadow = additionTheme.dimShadow
  }

  const styles = StyleSheet.create({
    inner: {
      backgroundColor: backgroundColor
    },
    topShadow: {
      shadowOffset: {
        width: -offset,
        height: -offset,
      },
      shadowOpacity: 1,
      shadowRadius: radius,
      shadowColor: upperShadow,
    },
    bottomShadow: {
      shadowOffset: {
        width: offset,
        height: offset,
      },
      shadowOpacity: 1,
      shadowRadius: radius,
      shadowColor: bottomShadow,
    },
  });

  return (
    <View style={styles.topShadow}>
      <View style={styles.bottomShadow}>
        <View style={[
          styles.inner,
          style
        ]}>
          {children}
        </View>
      </View>
    </View>
  );
}