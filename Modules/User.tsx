//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { useFetch } from '../Hooks/Fetch';
import { Shift, UserShiftsRequest, UserShiftsResponse } from '../Swagger';
import { UserComponent } from '../Components/User/UserComponent';


interface IUser extends IElevatedStateProps{
  username: string
}

export const User: FC<IUser> = ({elevatedState, setElevatedState, username}) => {
  const theme = useTheme()

  const [userShiftsResponse, setUserShiftsResponse] = useState<UserShiftsResponse>();
  const [userShifts, setUserShifts] = useState<Shift[]>([]);
  const [owner, setOwner] = useState(false)
  const fetchUserShifts = useFetch(elevatedState.APIInstaces.User,
                                   elevatedState.APIInstaces.User.userShifts,
                                   elevatedState, setElevatedState, setUserShiftsResponse)

  useEffect(() => {
    const urlParams: UserShiftsRequest = {
      username: username
    }

    fetchUserShifts(urlParams)
  }, [username]);

  useEffect(() => {
    if(!userShiftsResponse || !userShiftsResponse.shifts) return;

    setUserShifts(userShiftsResponse!.shifts)
  }, [userShiftsResponse]);

  return (
    <View style={{flex: 1, alignItems: "center", marginHorizontal: 10}}>
      <UserComponent elevatedState={elevatedState} setElevatedState={setElevatedState}
        setOwner={setOwner} username={username}/>
      <FlatList data={userShifts} renderItem={(item) => <FText>{item.item.title}</FText>}
        keyExtractor={item => String(item.id)} style={{marginTop: 10}}/>
    </View>
  );
}
