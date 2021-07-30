//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { useFetch } from '../Hooks/Fetch';
import { IndividualShiftPatchRequest, IndividualShiftGetResponse, IndividualShiftPatchResponse,
  IndividualShiftDeleteResponse, GetIndivdualShiftRequest, PatchIndivdualShiftRequest,
  DeleteIndivdualShiftRequest } from '../Swagger';
import { getCDNPrefix } from '../Helpers/Api';
import { MainStyles } from '../Styles/MainStyles';
import { ShiftUserComponent } from '../Components/Shift/ShiftUserComponent';
import { ShiftTitleComponent } from '../Components/Shift/ShiftTitleComponent';
import { ShiftButtonsComponent } from '../Components/Shift/ShiftButtonsComponent';


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


  useEffect(() => {
    if(editing || saving) return;

    const urlParams: GetIndivdualShiftRequest = {
      uuid: uuid
    }

    fetchGetIndividualShift(urlParams)
  }, [uuid, shiftPatchResponse, editing, elevatedState.APIInstances.apiKey]);

  useEffect(() => {
    if (!shiftGetResponse) return;


    setShiftMediaURL(`${getCDNPrefix(shiftGetResponse.shift!.mediaFilename!)}${shiftGetResponse.shift!.mediaFilename!}`)
    setBaseMediaURL(`${getCDNPrefix(shiftGetResponse.shift!.baseMediaFilename!)}${shiftGetResponse.shift!.baseMediaFilename!}`)
    setMaskMediaURL(`${getCDNPrefix(shiftGetResponse.shift!.maskMediaFilename!)}${shiftGetResponse.shift!.maskMediaFilename!}`)
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
    const confirmation = window.confirm("Are you sure you would like to delete your shift?")
    if(!confirmation) return;

    const urlParams: DeleteIndivdualShiftRequest = {
      uuid: uuid
    }

    fetchDeleteIndividualShift(urlParams)
    navigation.navigate("Home")
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
      <View>
        <FText>
        Stufff
        </FText>
      </View>
      {shiftGetResponse ? 
      <ShiftUserComponent owner={shiftGetResponse.owner} shift={shiftGetResponse.shift}/>
      : <></>}
    </View>
  );
}
