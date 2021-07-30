//Third Party Imports
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

//First Party Imports
import { FMedia } from '../Media';
import { IndividualShiftGetResponse } from '../../Swagger';
import { MainStyles } from '../../Styles/MainStyles';
import { Neumorphic } from '../Neumorphic';
import { FText } from '../Text';
import { API_BASE_URL } from '../../constants';


interface IShiftUser extends IndividualShiftGetResponse{}


export const ShiftUserComponent: FC<IShiftUser> = ({shift}) => {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate("User", {username: shift!.author.username})}>
      <View style={[MainStyles.spreadRow, {height: 150, width: '100%'}]}>
        <View style={{flex: 1, marginHorizontal: 10}}>
          <Neumorphic style={[MainStyles.borderRadius2, {padding: 5}]}>
            <FMedia style={[MainStyles.borderRadius2]}
            srcString={`${API_BASE_URL}/api/content/image/${shift!.author.mediaFilename!}`}/>
          </Neumorphic>
        </View>
        <View style={{flex: 2}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
              <FText style={{fontSize: 25}}>
                {shift!.author.username}
              </FText>
              <FText style={{marginLeft: 5}}>
                {shift!.author.admin! ? <Icon name='verified-user' type="material" color={theme.colors.text}/> : <></>}
                {shift!.author.verified! ? <Icon name='verified' type="material" color={theme.colors.text}/> : <></>}
              </FText>
            </View>
            <FText>{shift!.author!.email!}</FText>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>
    </TouchableOpacity>
  )
}