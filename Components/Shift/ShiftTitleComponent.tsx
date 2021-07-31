//Third Party Imports
import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

//First Party Imports
import { IndividualShiftGetResponse, IndividualShiftPatchRequest } from '../../Swagger';
import { MainStyles } from '../../Styles/MainStyles';
import { FText } from '../Text';
import { FTextInput } from '../TextInput';


interface IShiftTitle extends IndividualShiftGetResponse{
  editing: boolean
  setShiftChanges: React.Dispatch<React.SetStateAction<IndividualShiftPatchRequest["data"]>>
}

export const ShiftTitleComponent: FC<IShiftTitle> = ({editing, setShiftChanges, shift}) => {
  const theme = useTheme()


  let shiftTitleComponent = (
    <View style={[MainStyles.spreadRow]}>
      <View style={{flex: 1, alignItems: 'stretch', margin: 10}}>
        <FText style={{fontSize: 20, textAlign: 'center'}}>
          {shift!.title}
          {shift!.verified ? <Icon name='verified' type="material" color={theme.colors.text}/>
          : <></>}
        </FText>
      </View>
    </View>
  );

  if (editing){
    shiftTitleComponent = (
      <View style={[MainStyles.spreadRow]}>
        <View style={{flex: 1, alignItems: 'stretch', position: 'relative', margin: 10}}>
          <FTextInput defaultValue={shift!.title} placeholder="Title"
          onChangeText={(value: string) => {
            if(value !== shift!.title){
              setShiftChanges(prev => ({...prev, title: value}))
            }
          }} style={[MainStyles.borderRadius2, {padding: 5}]} alignText="center"/>
          <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, marginRight: 10,
          justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
            {shift!.verified ?
            <Icon name='verified' type="material" color={theme.colors.text}/> : <></>}
          </View>
        </View>
      </View>
    );
  }

  return shiftTitleComponent
}