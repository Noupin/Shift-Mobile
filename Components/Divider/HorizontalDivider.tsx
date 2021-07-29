//Third Party Imports
import React, { FC } from 'react';
import { ViewProps, View } from 'react-native';
import { MainStyles } from '../../Styles/MainStyles';

//First Party Imports
import { Neumorphic } from '../Neumorphic';


export const FHorizontalDivider: FC<ViewProps> = ({style}) => {
  return (
    <View style={{alignSelf: 'stretch'}}>
      <Neumorphic style={[{padding: 5, marginVertical: 10}, style, MainStyles.borderRadiusC]}>
      </Neumorphic>
    </View>
  );
}