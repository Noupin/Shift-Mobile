/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MainStyles } from '../../Styles/MainStyles';

//First Party Imports
import { FButton } from '../Button';
import { FText } from '../Text';
import { ADDITIONAL_THEME_ATTRIBUTES } from '../../constants';
import { booleanString } from '../../Types/FrontEndTypes';


interface IShiftButtons{
  editing: boolean
  deleteShift: () => void
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  setSaving: React.Dispatch<React.SetStateAction<boolean>>
}


export const ShiftButtonsComponent: FC<IShiftButtons> = ({editing, setEditing, setSaving, deleteShift}) => {
  const theme = useTheme()
  const additionalTheme = ADDITIONAL_THEME_ATTRIBUTES[String(theme.dark) as booleanString]

  let shiftButtonsComponent = (
    <View style={[MainStyles.spreadRow]}>
      <View style={{flex: 1, alignItems: 'stretch', margin: 10}}>
        <FButton onPress={() => setEditing(true)} style={[{padding: 7}, MainStyles.borderRadius2]}>
          <FText style={{textAlign: 'center'}}>Edit</FText>
        </FButton>
      </View>
      <View style={{flex: 1, alignItems: 'stretch', margin: 10}}>
        <FButton onPress={deleteShift} style={[{padding: 7}, MainStyles.borderRadius2]}>
          <FText style={{textAlign: 'center', color: additionalTheme.errorText}}>Delete</FText>
        </FButton>
      </View>
    </View>
  )

  if (editing){
    shiftButtonsComponent = (
      <View style={[MainStyles.spreadRow]}>
        <View style={{flex: 1, alignItems: 'stretch', margin: 10}}>
          <FButton style={[{padding: 7}, MainStyles.borderRadius2]}
          onPress={() => {
            setEditing(false);
            setSaving(true)
          }}>
            <FText style={{textAlign: 'center'}}>Save</FText>
          </FButton>
        </View>
        <View style={{flex: 1, alignItems: 'stretch', margin: 10}}>
          <FButton style={[{padding: 7}, MainStyles.borderRadius2]}
          onPress={() => setEditing(false)}>
            <FText style={{textAlign: 'center', color: additionalTheme.errorText}}>Cancel</FText>
          </FButton>
        </View>
      </View>
    )
  }

  return shiftButtonsComponent
}