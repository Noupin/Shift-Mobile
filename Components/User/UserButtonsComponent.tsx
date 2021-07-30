/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { useNavigation } from '@react-navigation/native';
import React, { FC, ReactElement} from 'react';
import { View } from 'react-native';
import { MainStyles } from '../../Styles/MainStyles';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

//First Party Imports
import { FButton } from '../Button';
import { FText } from '../Text';
import { ADDITIONAL_THEME_ATTRIBUTES } from '../../constants';
import { booleanString } from '../../Types/FrontEndTypes';


interface IUserButtons{
  editing: boolean
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
  setSaving: React.Dispatch<React.SetStateAction<boolean>>
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>
}


export const UserButtonComponent: FC<IUserButtons> = ({editing, setEditing, setSaving, setDeleting}): ReactElement => {
  const navigation = useNavigation()
  const theme = useTheme()
  const additionalTheme = ADDITIONAL_THEME_ATTRIBUTES[String(theme.dark) as booleanString]

  let userButtonComponent = (
    <View style={[MainStyles.spreadRow, {marginBottom: 10}]}>
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <FButton onPress={() => setEditing(true)}
        style={[MainStyles.borderRadius2, {justifyContent: 'center', alignSelf: 'stretch',
        flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', padding: 5}]}>
          <FText>Edit</FText>
          <Icon name="edit" type="material" color={theme.colors.text}/>
        </FButton>
      </View>
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <FButton onPress={() => setDeleting(true)}
        style={[MainStyles.borderRadius2, {justifyContent: 'center', alignSelf: 'stretch',
        flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', padding: 5}]}>
          <FText style={{color: additionalTheme.errorText}}>Delete</FText>
          <Icon name="delete" type="material" color={additionalTheme.errorText}/>
        </FButton>
      </View>
    </View>
  )

  if (editing){
    userButtonComponent = (
      <View style={MainStyles.spreadColumn}>
        <View style={[MainStyles.spreadRow, {marginTop: 10, marginBottom: 15}]}>
          <View style={{flex: 1, alignItems: 'stretch'}}>
            <FButton onPress={() => navigation.navigate("ChangePassword")}
            style={[MainStyles.borderRadius2, {justifyContent: 'center', alignSelf: 'stretch',
            flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', padding: 7}]}>
              <FText>Change Password</FText>
            </FButton>
          </View>
        </View>
        <View style={[MainStyles.spreadRow, {marginBottom: 10}]}>
          <View style={{flex: 1, alignItems: 'stretch'}}>
            <FButton onPress={() => {
                setEditing(false)
                setSaving(true)
              }} style={[MainStyles.borderRadius2, {justifyContent: 'center', alignSelf: 'stretch',
              flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', padding: 7}]}>
              <FText>Save</FText>
              <Icon name="save" type="material" color={theme.colors.text}/>
            </FButton>
          </View>
          <View style={{flex: 1, alignItems: 'stretch'}}>
            <FButton onPress={() => setEditing(false)} style={[MainStyles.borderRadius2, {justifyContent: 'center', alignSelf: 'stretch',
              flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', padding: 7}]}>
              <FText style={{color: additionalTheme.errorText}}>Cancel</FText>
              <Icon name="block" type="material" color={additionalTheme.errorText}/>
            </FButton>
          </View>
        </View>
      </View>
    )
  }

  return userButtonComponent
}