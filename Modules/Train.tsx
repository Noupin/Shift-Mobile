//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';


export const Train: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const theme = useTheme()

  return (
    <View style={{flex: 1, alignItems: "center", marginHorizontal: 10}}>
      <FText>Train</FText>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FText>Images</FText>
      </View>
    </View>
  );
}
