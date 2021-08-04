//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { View, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import uuid from 'react-native-uuid';
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
import { FTextInput } from '../TextInput';
import { UserButtonComponent } from './UserButtonsComponent';
import { getCDNPrefix } from '../../Helpers/Api';


const DeleteAccountAlert = async () => new Promise((resolve) => {
  const confirm = Alert.alert(
    "Delete Account?",
    "Are you sure you would like to delete your account? This action is permanent and cannot be reversed.",
    [
      {text: 'Confirm', style: "destructive", onPress: () => resolve(true)},
      {text: 'Cancel', style: "default", onPress: () => resolve(false)}
    ]
  )
})


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
  const [profilePicture, setProfilePicture] = useState("");


  const fetchGetUser = useFetch(elevatedState.APIInstances.User,
                                elevatedState.APIInstances.User.getIndivdualUser,
                                elevatedState, setElevatedState, setUserGetResponse)
  const fetchDeleteUser = useFetch(elevatedState.APIInstances.User,
                                   elevatedState.APIInstances.User.deleteIndivdualUser,
                                   elevatedState, setElevatedState, setUserDeleteResponse)
  const fetchPatchUser = useFetch(elevatedState.APIInstances.User,
                                  elevatedState.APIInstances.User.patchIndivdualUser,
                                  elevatedState, setElevatedState, setUserPatchResponse)
  const fetchUpdateUserPicture = useFetch(elevatedState.APIInstances.User,
                                          elevatedState.APIInstances.User.updatePicture,
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
    async function deleteAccount(){
      const confirmation = await DeleteAccountAlert()
      if(!confirmation) return;

      const urlParams: DeleteIndivdualUserRequest = {
        username: username
      }

      await fetchDeleteUser(urlParams)
      await fetchRefresh()
      navigation.navigate("Home", {startLoading: false})
    }

    deleteAccount()
    setDeleting(false)
  }, [deleting])

  //User get response
  useEffect(() => {
    if(!userGetResponse || !userGetResponse.user) return;

    setOwner(userGetResponse.owner)
    setProfilePictureURL(`${getCDNPrefix(userGetResponse!.user.mediaFilename!)}${userGetResponse!.user.mediaFilename}`);
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
      await fetchPatchUser(urlParams)
      await fetchRefresh()
    }

    async function updateProfilePicture(){
      console.log(profilePicture)
      if(!profilePicture) return;

      let uriParts = profilePicture.split(".");
      let fileType = uriParts[uriParts.length - 1];

      let renamedFile = {
        uri: profilePicture,
        name: `${uuid.v4()}.${fileType}`,
        type: `image/${fileType}`
      }

      const requestParams: UpdatePictureRequest = {
        requestFile: renamedFile as unknown as Blob
      }
      console.log(requestParams)
      await fetchUpdateUserPicture(requestParams)
    }

    patchUser()
    updateProfilePicture()    
    setSaving(false)
    setProfilePicture("") //Try to remove
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
      <View style={[MainStyles.spreadColumn]}>
        <View style={[MainStyles.spreadRow, {maxHeight: 150, marginBottom: 10}]}>
          <View style={{flex: 1}}>
            <UserMediaComponent setElevatedState={setElevatedState} profilePictureURL={profilePictureURL}
              editing={editing} setProfilePictureURL={setProfilePictureURL} setProfilePicture={setProfilePicture}/>
          </View>
          <View style={{flexDirection: 'column', flex: 2, marginLeft: 10}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: "center"}}>
                <FText style={{fontSize: 25}}>
                  {username}
                </FText>
                <FText style={{marginLeft: 5}}>
                  {userGetResponse.user!.admin! ? <Icon name='verified-user' type="material" color={theme.colors.text}/> : <></>}
                  {userGetResponse.user!.verified! ? <Icon name='verified' type="material" color={theme.colors.text}/> : <></>}
                </FText>
              </View>
              <FText>{userGetResponse.user!.email!}</FText>
            </View>
          </View>
        </View>
        {userGetResponse && userGetResponse.owner && elevatedState.authenticated &&
        <UserButtonComponent editing={editing} setEditing={setEditing} setSaving={setSaving}
          setDeleting={setDeleting}/>}
      </View>
    );

    if(editing){
      userComponent = (
        <View style={MainStyles.spreadColumn}>
          <View style={[MainStyles.spreadRow, {height: 150}]}>
            <View style={{flex: 1}}>
              <UserMediaComponent setElevatedState={setElevatedState} profilePictureURL={profilePictureURL}
                editing={editing} setProfilePictureURL={setProfilePictureURL} setProfilePicture={setProfilePicture}/>
            </View>
            <View style={{flexDirection: 'column', flex: 2, marginLeft: 10}}>
              <View>
                <FTextInput placeholder="Username" defaultValue={username} padding={10}
                  style={{marginVertical: 10, ...MainStyles.center, ...MainStyles.borderRadius2}}
                  autoCapitalize="none" autoCorrect={false} alignText="left"
                  onChangeText={(value) => {
                    if(value !== userGetResponse.user!.username){
                      setUserChanges(prev => ({...prev, username: value}))
                    }
                }}/>
                <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, marginRight: 10,
                  justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                  {userGetResponse.user!.admin! ?
                  <Icon name='verified-user' type="material" color={theme.colors.text}/> : <></>}
                  {userGetResponse.user!.verified! ?
                  <Icon name='verified' type="material" color={theme.colors.text}/> : <></>}
                </View>
              </View>
              <FTextInput placeholder="Email" value={userGetResponse.user!.email!} padding={10}
                style={{marginVertical: 10, ...MainStyles.center, ...MainStyles.borderRadius2}}
                autoCapitalize="none" autoCorrect={false} alignText="left"
                onChangeText={(value) => {
                  if(value !== userGetResponse.user!.email){
                    setUserChanges(prev => ({...prev, email: value}))
                  }
              }}/>
            </View>
          </View>
          {userGetResponse && userGetResponse.owner && elevatedState.authenticated &&
          <UserButtonComponent editing={editing} setEditing={setEditing} setSaving={setSaving}
            setDeleting={setDeleting}/>}
        </View>
      );
    }
  }

  return userComponent;
}
