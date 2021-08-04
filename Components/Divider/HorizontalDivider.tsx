//Third Party Imports
import React, { FC } from 'react';
import { ViewStyle, View } from 'react-native';
import { MainStyles } from '../../Styles/MainStyles';

//First Party Imports
import { Neumorphic } from '../Neumorphic';

interface IHorizontalDivider{
  style?: ViewStyle
}

export const FHorizontalDivider: FC<IHorizontalDivider> = ({style}) => {
  return (
    <View style={{alignSelf: 'stretch'}}>
      <Neumorphic style={{padding: 5, marginVertical: 10, ...style, ...MainStyles.borderRadiusC}}>
      </Neumorphic>
    </View>
  );
}