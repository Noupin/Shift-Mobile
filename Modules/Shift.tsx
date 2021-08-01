//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Share, View, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useTheme } from '@react-navigation/native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { useFetch } from '../Hooks/Fetch';
import { IndividualShiftPatchRequest, IndividualShiftGetResponse, IndividualShiftPatchResponse,
  IndividualShiftDeleteResponse, GetIndivdualShiftRequest, PatchIndivdualShiftRequest,
  DeleteIndivdualShiftRequest } from '../Swagger';
import { getCDNPrefix } from '../Helpers/Api';
import { MainStyles } from '../Styles/MainStyles';
import { ShiftUserComponent } from '../Components/Shift/ShiftUserComponent';
import { ShiftTitleComponent } from '../Components/Shift/ShiftTitleComponent';
import { ShiftButtonsComponent } from '../Components/Shift/ShiftButtonsComponent';
import { Neumorphic } from '../Components/Neumorphic';
import { FMedia } from '../Components/Media';
import { API_BASE_URL } from '../constants';
import { FText } from '../Components/Text';
import { FButton } from '../Components/Button';


const DeleteShiftAlert = async () => new Promise((resolve) => {
  const confirm = Alert.alert(
    "Delete Shift?",
    "Are you sure you would like to delete this shift? This action is permanent and cannot be reversed.",
    [
      {text: 'Confirm', style: "destructive", onPress: () => resolve(true)},
      {text: 'Cancel', style: "default", onPress: () => resolve(false)}
    ]
  )
})

const handleDownload = async (imageURI: string, extension: string) => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: extension,
  })
    .fetch('GET', imageURI)
    .then(res => {
      CameraRoll.saveToCameraRoll(res.data, 'photo')
        .catch(err => console.error(err))
    })
    .catch(error => console.error(error));
};


interface IShift extends IElevatedStateProps{
  uuid: string
}

export const Shift: FC<IShift> = ({elevatedState, setElevatedState, uuid}) => {
  const theme = useTheme()
  const navigation = useNavigation()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [shiftChanges, setShiftChanges] = useState<IndividualShiftPatchRequest["data"]>({})


  const [shiftGetResponse, setShiftGetResponse] = useState<IndividualShiftGetResponse>();
  const [shiftPatchResponse, setShiftPatchResponse] = useState<IndividualShiftPatchResponse>();
  const [shiftDeleteResponse, setShiftDeleteResponse] = useState<IndividualShiftDeleteResponse>();
  const [shiftMediaURL, setShiftMediaURL] = useState("");
  const [baseMediaURL, setBaseMediaURL] = useState("");
  const [maskMediaURL, setMaskMediaURL] = useState("");
  
  const fetchGetIndividualShift = useFetch(elevatedState.APIInstances.Shift,
                                           elevatedState.APIInstances.Shift.getIndivdualShift,
                                           elevatedState, setElevatedState, setShiftGetResponse)
  const fetchPatchIndividualShift = useFetch(elevatedState.APIInstances.Shift,
                                             elevatedState.APIInstances.Shift.patchIndivdualShift,
                                             elevatedState, setElevatedState, setShiftPatchResponse, setSaving)
  const fetchDeleteIndividualShift = useFetch(elevatedState.APIInstances.Shift,
                                              elevatedState.APIInstances.Shift.deleteIndivdualShift,
                                              elevatedState, setElevatedState, setShiftDeleteResponse)


  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
        `Shift: ${shiftGetResponse?.shift!.title} by ${shiftGetResponse?.shift!.author.username} at ${API_BASE_URL}/shift/${uuid}
Look at the shift ${shiftGetResponse?.shift!.author.username} made. Make your own at https://shift.feryv.com`,
        url:
        `${API_BASE_URL}/shift/${uuid}`,
        title:
        `${API_BASE_URL}/shift/${uuid}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };


  useEffect(() => {
    if(editing || saving) return;

    const urlParams: GetIndivdualShiftRequest = {
      uuid: uuid
    }

    fetchGetIndividualShift(urlParams)
  }, [uuid, shiftPatchResponse, editing, elevatedState.APIInstances.apiKey]);

  useEffect(() => {
    if (!shiftGetResponse) return;


    setShiftMediaURL(`${API_BASE_URL}${getCDNPrefix(shiftGetResponse.shift!.mediaFilename!)}${shiftGetResponse.shift!.mediaFilename!}`)
    setBaseMediaURL(`${API_BASE_URL}${getCDNPrefix(shiftGetResponse.shift!.baseMediaFilename!)}${shiftGetResponse.shift!.baseMediaFilename!}`)
    setMaskMediaURL(`${API_BASE_URL}${getCDNPrefix(shiftGetResponse.shift!.maskMediaFilename!)}${shiftGetResponse.shift!.maskMediaFilename!}`)
  }, [shiftGetResponse])

  useEffect(() => {
    if(!saving || Object.keys(shiftChanges).length === 0) return;

    const requestBody: IndividualShiftPatchRequest = {
      data: shiftChanges
    }

    const urlParams: PatchIndivdualShiftRequest = {
      uuid: uuid,
      body: requestBody
    }

    fetchPatchIndividualShift(urlParams)
  }, [saving])

  useEffect(() => {
    if (!shiftPatchResponse) return;

    setElevatedState((prev) => ({...prev, msg: shiftPatchResponse.msg!}))
  }, [shiftPatchResponse])

  useEffect(() => {
    if (!shiftDeleteResponse) return;

    setElevatedState((prev) => ({...prev, msg: shiftDeleteResponse.msg!}))
  }, [shiftDeleteResponse])


  function deleteShift(){
    async function checkDelete(){
      const confirmation = await DeleteShiftAlert()
      if(!confirmation) return;

      const urlParams: DeleteIndivdualShiftRequest = {
        uuid: uuid
      }

      fetchDeleteIndividualShift(urlParams)
      navigation.navigate("Home")
    }

    checkDelete()
  }


  return (
    <View style={{flex: 1, alignItems: "center", marginHorizontal: 10}}>
      {shiftGetResponse ? 
      <ShiftTitleComponent owner={shiftGetResponse.owner} shift={shiftGetResponse.shift}
        editing={editing} setShiftChanges={setShiftChanges}/>
      : <></>}
      {shiftGetResponse && shiftGetResponse.owner ? 
      <ShiftButtonsComponent editing={editing} setEditing={setEditing}
        setSaving={setSaving} deleteShift={deleteShift}/>
      : <></>}
      <View style={[MainStyles.spreadColumn, {flex: 1}]}>
        <View style={{flex: 3}}>
          <Neumorphic style={[{padding: 5}, MainStyles.borderRadius2]}>
            <FMedia style={MainStyles.borderRadius2} srcString={shiftMediaURL}/>
          </Neumorphic>
        </View>
        <View style={[MainStyles.spreadRow, {flex: 1}]}>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='north-east' type='material' color={theme.colors.text}/>
          </View>
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name='north-west' type='material' color={theme.colors.text}/>
          </View>
        </View>
        <View style={[MainStyles.spreadRow, {flex: 2, margin: 5}]}>
          <View style={{flex:1}}>
            <Neumorphic style={[{padding: 5, marginHorizontal: 5}, MainStyles.borderRadius2]}>
              <FMedia style={MainStyles.borderRadius2} srcString={baseMediaURL}/>
            </Neumorphic>
          </View>
          <View style={{flex:1}}>
            <Neumorphic style={[{padding: 5, marginHorizontal: 5}, MainStyles.borderRadius2]}>
              <FMedia style={MainStyles.borderRadius2} srcString={maskMediaURL}/>
            </Neumorphic>
          </View>
        </View>
      </View>
      <View style={[MainStyles.spreadRow]}>
        <View style={{flex: 1, margin: 5, alignItems: 'stretch'}}>
          <FButton style={[MainStyles.borderRadius2, {justifyContent: 'center',
          alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', padding: 5}]}
          onPress={onShare}>
            <FText>Share</FText>
            <Icon name="share" type="material"/>
          </FButton>
        </View>
        <View style={{flex: 1, margin: 5, alignItems: 'stretch'}}>
          <FButton style={[MainStyles.borderRadius2, {justifyContent: 'center',
          alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', padding: 5}]}
          onPress={() => {handleDownload(shiftMediaURL, shiftMediaURL.split('.')[-1])}}>
            <FText>Download</FText>
            <Icon name="south" type="material"/>
          </FButton>
        </View>
        <View style={{flex: 1, margin: 5, alignItems: 'stretch'}}>
          <FButton style={[MainStyles.borderRadius2, {justifyContent: 'center',
          alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', padding: 5}]}
          onPress={() => {
            setElevatedState(prev => ({...prev, prebuiltShiftModel: uuid}))
            navigation.navigate("Home")
          }}>
            <FText>Shift</FText>
            <Icon name="east" type="material"/>
          </FButton>
        </View>
      </View>
      {shiftGetResponse ? 
      <ShiftUserComponent owner={shiftGetResponse.owner} shift={shiftGetResponse.shift}/>
      : <></>}
    </View>
  );
}
