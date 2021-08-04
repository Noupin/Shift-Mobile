//Third Party Imports
import React, { FC } from "react";
import { useTheme } from '@react-navigation/native';
import { NeomorphFlex, NeomorphFlexProps } from 'react-native-neomorph-shadows';

//First Party Imports
import { ADDITIONAL_THEME_ATTRIBUTES } from "../constants";
import { booleanString } from "../Types/FrontEndTypes";
import { MainStyles } from "../Styles/MainStyles";


interface INeurmorphic extends NeomorphFlexProps{
  radius?: number
  borderRadius?: {borderRadius: number}
  backgroundColor?: string
  upperShadow?: string
  bottomShadow?: string
  includeTheme?: boolean
}


export const Neumorphic: FC<INeurmorphic> = ({children, style, radius=4,
  includeTheme=true, backgroundColor='#ececec', upperShadow='rgba(255, 255, 255, 0.4)',
  bottomShadow='rgba(0, 0, 0, 0.05)', borderRadius=MainStyles.borderRadius2}) => {

  const theme = useTheme()

  if(includeTheme){
    const additionalTheme = ADDITIONAL_THEME_ATTRIBUTES[String(theme.dark) as booleanString]
    if(backgroundColor === '#ececec') backgroundColor = theme.colors.background
    if(upperShadow === 'rgba(255, 255, 255, 0.4)') upperShadow = additionalTheme.brightShadow
    if(bottomShadow === 'rgba(0, 0, 0, 0.05)') bottomShadow = additionalTheme.dimShadow
  }


  return (
    <NeomorphFlex key={String(theme.dark)} style={{backgroundColor: backgroundColor,
      shadowRadius: radius, ...borderRadius, ...style}}>
      {children}
    </NeomorphFlex>
  );
}