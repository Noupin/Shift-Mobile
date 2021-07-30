//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

//First Party Imports
import { Neumorphic } from './Neumorphic';
import { Shift } from '../Swagger';
import { FMedia } from './Media'
import { navigate } from '../Helpers/Navigation';
import { getCDNPrefix } from '../Helpers/Api';
import { FText } from './Text';


export interface IShiftCard extends TouchableOpacityProps{
  shift: Shift
}

export const FShiftCard: FC<IShiftCard> = ({children, style, shift, ...props}) => {

  return (
    <TouchableOpacity {...props} onPress={() => {navigate("Shift", {uuid: shift.uuid})}}>
      <Neumorphic style={[style, {padding: 10}]}>
        <FMedia srcString={`${getCDNPrefix(shift.mediaFilename!)}${shift.mediaFilename}`}/>
      </Neumorphic>
      <FText>{shift.title}</FText>
    </TouchableOpacity>
  );
}