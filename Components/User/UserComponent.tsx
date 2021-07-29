//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { View, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useTheme } from '@react-navigation/native';

//First Party Imports
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { FText } from '../../Components/Text';
import { useFetch } from '../../Hooks/Fetch';
import { DeleteIndivdualUserRequest, GetIndivdualUserRequest, IndividualShiftDeleteResponse, IndividualUserGetResponse,
  IndividualUserPatchRequest, IndividualUserPatchResponse, PatchIndivdualUserRequest, UpdatePictureRequest, UpdatePictureResponse } from '../../Swagger';
import { useRefresh } from '../../Hooks/Refresh';
import { MainStyles } from '../../Styles/MainStyles';
import { UserMediaComponent } from './UserMediaComponent';
import { API_BASE_URL } from '../../constants';


interface IUser extends IElevatedStateProps{
    setOwner: React.Dispatch<React.SetStateAction<boolean>>
    username: string
}

export const UserComponent: FC<IUser> = ({elevatedState, setElevatedState, setOwner, username}) => {
  const theme = useTheme()
  const navigation = useNavigation()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [userChanges, setUserChanges] = useState<IndividualUserPatchRequest["data"]>({})

  const [userGetResponse, setUserGetResponse] = useState<IndividualUserGetResponse>();
  const [userPatchResponse, setUserPatchResponse] = useState<IndividualUserPatchResponse>();
  const [userDeleteResponse, setUserDeleteResponse] = useState<IndividualShiftDeleteResponse>();
  const [updatePictureResponse, setUpdatePictureResponse] = useState<UpdatePictureResponse>();
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [profilePicture, setProfilePicture] = useState<File>();


  const fetchGetUser = useFetch(elevatedState.APIInstaces.User,
                                elevatedState.APIInstaces.User.getIndivdualUser,
                                elevatedState, setElevatedState, setUserGetResponse)
  const fetchDeleteUser = useFetch(elevatedState.APIInstaces.User,
                                   elevatedState.APIInstaces.User.deleteIndivdualUser,
                                   elevatedState, setElevatedState, setUserDeleteResponse)
  const fetchPatchUser = useFetch(elevatedState.APIInstaces.User,
                                  elevatedState.APIInstaces.User.patchIndivdualUser,
                                  elevatedState, setElevatedState, setUserPatchResponse)
  const fetchUpdateUserPicture = useFetch(elevatedState.APIInstaces.User,
                                          elevatedState.APIInstaces.User.updatePicture,
                                          elevatedState, setElevatedState, setUpdatePictureResponse)
  const fetchRefresh = useRefresh(setElevatedState)


  //Get user
  useEffect(() => {
    if(editing || saving) return;

    const urlParams: GetIndivdualUserRequest = {
      username: username
    }
    fetchGetUser(urlParams)
  }, [username, editing]);

  //Delete user and refresh access token
  useEffect(() => {
    if (!deleting) return;
    const confirmation = window.confirm("Are you sure you would like to delete your account?")
    if(!confirmation) return;

    const urlParams: DeleteIndivdualUserRequest = {
      username: username
    }

    fetchDeleteUser(urlParams)
    fetchRefresh()
    navigation.navigate("Home")
  }, [deleting])

  //User get response
  useEffect(() => {
    if(!userGetResponse || !userGetResponse.user) return;

    setOwner(userGetResponse.owner)
    setProfilePictureURL(`${API_BASE_URL}/api/content/image/${userGetResponse!.user.mediaFilename}`);
  }, [userGetResponse]);

  //Patch and Profile Picture update
  useEffect(() => {
    if(!saving) return;

    async function patchUser(){
      if(Object.keys(userChanges).length === 0) return

      const requestBody: IndividualUserPatchRequest = {
        data: userChanges
      }

      const urlParams: PatchIndivdualUserRequest = {
        username: username,
        body: requestBody
      }
      fetchPatchUser(urlParams)
      fetchRefresh()
    }

    async function updateProfilePicture(){
      if(!profilePicture) return;

      const requestParams: UpdatePictureRequest = {
        requestFile: profilePicture
      }
      fetchUpdateUserPicture(requestParams)
    }

    patchUser()
    updateProfilePicture()    
    setSaving(false)
    setProfilePicture(undefined) //Try to remove
  }, [saving])

  //Patched user repsonse adn url forwarding
  useEffect(() => {
    if (!userPatchResponse) return;

    setElevatedState((prev) => ({...prev, msg: userPatchResponse.msg!}))

    if(userChanges.username! && userChanges.username! !== username){
      navigation.navigate(`User`, {username: userChanges.username})
    }
  }, [userPatchResponse])

  //Deleted user response
  useEffect(() => {
    if (!userDeleteResponse) return;

    setElevatedState((prev) => ({...prev, msg: userDeleteResponse.msg!}))
  }, [userDeleteResponse])

  //Updated Profile Picture Response
  useEffect(() => {
    if (!updatePictureResponse) return;

    setElevatedState((prev) => ({...prev, msg: updatePictureResponse.msg!}))
  }, [updatePictureResponse])


  //Rendering Components
  let userComponent = <></>

  if(userGetResponse && userGetResponse.user!){
    userComponent = (
      <View style={[MainStyles.spreadColumn, {flexDirection: 'row'}]}>
        <View style={{flex: 1}}>
        <UserMediaComponent setElevatedState={setElevatedState} profilePictureURL={profilePictureURL}
          editing={editing} setProfilePictureURL={setProfilePictureURL} setProfilePicture={setProfilePicture}/>
        </View>
        <View style={{flexDirection: 'column', flex: 2, marginLeft: 10}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
              <FText style={{fontSize: 25}}>
                {username}
              </FText>
              <FText>
                {userGetResponse.user!.admin! ? <Icon name='verified-user' type="material" color={theme.colors.text}/> : <></>}
                {userGetResponse.user!.verified! ? <Icon name='verified' type="material" color={theme.colors.text}/> : <></>}
              </FText>
            </View>
            <FText>{userGetResponse.user!.email!}</FText>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>
    );

    if(editing){
      userComponent = <></>
    }
  }

  return userComponent;
}
