//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { BlurView } from "@react-native-community/blur";

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
  fillHeight?: boolean
}

export const FShiftCard: FC<IShiftCard> = ({children, style, shift, fillHeight=true, ...props}) => {
  const theme = useTheme()

  return (
    <TouchableOpacity {...props} onPress={() => {navigate("Shift", {uuid: shift.uuid})}}>
      <Neumorphic style={[style, {padding: 5, margin: 10}, MainStyles.borderRadius2]}>
        <View style={{position: 'relative'}}>
          <FMedia style={[MainStyles.borderRadius2, fillHeight && {height: "100%"}]}
          srcString={`${API_BASE_URL}${getCDNPrefix(shift.mediaFilename!)}${shift.mediaFilename}`}/>
          <BlurView blurType={theme.dark ? "dark" : "light"}
          style={[{position: 'absolute', bottom: 0, left: 0, padding: 5}, MainStyles.borderRadius2]}>
            <FText style={{fontSize: 20, fontWeight: '500'}}>
              {shift.title}
            </FText>
          </BlurView>
        </View>
      </Neumorphic>
    </TouchableOpacity>
  );
}