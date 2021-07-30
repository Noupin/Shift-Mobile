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
import { API_BASE_URL } from '../constants';
import { MainStyles } from '../Styles/MainStyles';


export interface IShiftCard extends TouchableOpacityProps{
  shift: Shift
}

export const FShiftCard: FC<IShiftCard> = ({children, style, shift, ...props}) => {

  return (
    <TouchableOpacity {...props} onPress={() => {navigate("Shift", {uuid: shift.uuid})}}>
      <Neumorphic style={[style, {padding: 10, margin: 10}, MainStyles.borderRadius2]}>
        <FMedia style={[MainStyles.borderRadius2]}
        srcString={`${API_BASE_URL}${getCDNPrefix(shift.mediaFilename!)}${shift.mediaFilename}`}/>
        <FText>{shift.title}</FText>
      </Neumorphic>
    </TouchableOpacity>
  );
}