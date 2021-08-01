//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { TouchableOpacity, View, Platform } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Icon } from 'react-native-elements';
import uuid from 'react-native-uuid';
import { Dimensions } from 'react-native';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { API_BASE_URL, GESTURE_CONFIG, validMediaFileExtesnions } from '../constants';
import { MainStyles } from '../Styles/MainStyles';
import { Neumorphic } from '../Components/Neumorphic';
import { pickMedia, validateFilenameList } from '../Helpers/Files';
import { useFetch } from '../Hooks/Fetch';
import { LoadDataResponse, IndividualShiftGetResponse, GetIndivdualShiftRequest,
  LoadDataRequest } from '../Swagger';
import { getCDNPrefix } from '../Helpers/Api';
import { fillArray } from '../Helpers/Arrays';
import { FMedia } from '../Components/Media';
import { FButton } from '../Components/Button';


export const Load: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const navigation = useNavigation()

  const [open, setOpen] = useState(false)
  const windowHeight = Dimensions.get('window').height


  const [trainingDataTypes, setTrainingDataTypes] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [baseFiles, setBaseFiles] = useState<string[]>([]);
  const [maskFiles, setMaskFiles] = useState<string[]>([]);
  const [baseMedia, setBaseMedia] = useState<string>();


  const [fetching, setFetching] = useState(false);
  const [loadResponse, setLoadResponse] = useState<LoadDataResponse>();
  const fetchLoad = useFetch(elevatedState.APIInstances.Load,
                             elevatedState.APIInstances.Load.loadData,
                             elevatedState, setElevatedState, setLoadResponse, setFetching)
  const [shiftResponse, setShiftResponse] = useState<IndividualShiftGetResponse>();
  const fetchShift = useFetch(elevatedState.APIInstances.Shift,
                              elevatedState.APIInstances.Shift.getIndivdualShift,
                              elevatedState, setElevatedState, setShiftResponse)

  const prevShiftUUID = elevatedState.shiftUUID


  useEffect(() => {
    async function setMediaFromPrebuilt(){
      const requestParams: GetIndivdualShiftRequest = {
        uuid: elevatedState.prebuiltShiftModel
      }
      fetchShift(requestParams)

      if(!shiftResponse || !shiftResponse.shift || !shiftResponse.shift!.baseMediaFilename) return;

      const apiPrefix = getCDNPrefix(shiftResponse.shift!.baseMediaFilename!)
      setBaseMedia(`${API_BASE_URL}${apiPrefix}${shiftResponse.shift!.baseMediaFilename!}`)
      setElevatedState((prev) => ({...prev, prebuiltShiftModel: ""})) //Remove to test loading of prebuilt models
    }

    if(elevatedState.prebuiltShiftModel){
      setMediaFromPrebuilt()
    }
  }, [shiftResponse]);

  //Load Request
  useEffect(() => {
    if(!fetching) return;

    if(!baseMedia){
      setElevatedState((prev) => ({...prev, msg: "Make sure you have a primary base media"}))
      setFetching(false);
      return;
    }

    let renamedFiles = files.map((uri: string) => {
      let uriParts = uri.split(".");
      let fileType = uriParts[uriParts.length - 1];
      return {uri, name: `${uuid.v4()}.${fileType}`, type: `image/${fileType}`,}
    })

    const loadDataParams: LoadDataRequest = {
      trainingDataTypes: trainingDataTypes,
      requestFiles: renamedFiles as unknown as Blob[]
    }
    console.log(loadDataParams.requestFiles)
    fetchLoad(loadDataParams)
  }, [fetching]);

  //Update values from response
  useEffect(() => {
    if(!loadResponse) return;
    console.log(loadResponse)

    setElevatedState((prev) => ({...prev, shiftUUID: loadResponse.shiftUUID!}))
    setElevatedState((prev) => ({...prev, msg: loadResponse.msg!}));
  }, [loadResponse]);

  //Change the page from button clicks
  useEffect(() => {
    if(!elevatedState.shiftUUID || elevatedState.shiftUUID === prevShiftUUID) return;

    if(elevatedState.frontEndSettings.trainingShift){
      navigation.navigate("Train")
    }
    else{
      //navigation.navigate("Inference")
    }
  }, [elevatedState.shiftUUID]);

  //Update files to send
  useEffect(() => {
    if(!baseMedia) return;

    setFiles([baseMedia, ...baseFiles, ...maskFiles]);
    setTrainingDataTypes([...fillArray("base", baseFiles.length+1),
                          ...fillArray("mask", maskFiles.length)])
  }, [baseMedia, baseFiles, maskFiles]);


  const onSwipe = (direction: string) => {
    switch(direction){
      case "SWIPE_UP":
        setOpen(true)
        break;
      case "SWIPE_DOWN":
        setOpen(false)
        break;
    }
  }

  async function changeBaseFiles(mediaList: ImageOrVideo[]){
    const mediaFiles: string[] = []
    for(var index=0; index < mediaList.length; index++){
      mediaFiles.push(Platform.OS === 'ios' ? mediaList[index].sourceURL! : mediaList[index].path)
    }

    const [filteredFiles, badExtensions] = validateFilenameList(mediaFiles, validMediaFileExtesnions)

    if(badExtensions.length > 0){
      setElevatedState((prev) => ({...prev,
        msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
    }
    if(filteredFiles.length === 0){
      setBaseMedia(undefined)
    }
    else{
      setBaseMedia(filteredFiles[0])
    }
  }

  async function changeMaskFiles(mediaList: ImageOrVideo[]){
    const mediaFiles: string[] = []
    for(var index=0; index < mediaList.length; index++){
      mediaFiles.push(Platform.OS === 'ios' ? mediaList[index].sourceURL! : mediaList[index].path)
    }

    const [filteredFiles, badExtensions] = validateFilenameList(mediaFiles, validMediaFileExtesnions)

    if(badExtensions.length > 0){
      setElevatedState((prev) => ({...prev,
        msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
    }
    if(filteredFiles.length === 0){
      setMaskFiles([])
    }
    else{
      setMaskFiles([filteredFiles[0]])
    }
  }


  return (
    <GestureRecognizer
    onSwipe={(direction) => onSwipe(direction)}
    config={GESTURE_CONFIG}
    style={{flex: 1}}>
      <Neumorphic style={[MainStyles.borderRadius5]}>
        <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}, open ? {height: windowHeight*0.88} : {height: windowHeight*0.1}]}>
          {!open &&
          <TouchableOpacity onPress={() => setOpen(prev => !prev)}>
            <FText style={{fontSize: 20}}>Load</FText>
          </TouchableOpacity>}
          {open && 
          <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 16, justifyContent: 'space-between', alignContent: 'center'}}>
              <FText style={{textAlign: 'center', fontSize: 20}}>
                Base Face
              </FText>
              <Neumorphic style={[{padding: 5}, MainStyles.borderRadius2]}>
                <View>
                  <TouchableOpacity onPress={() => pickMedia(setElevatedState, (media) => changeBaseFiles([media]))}>
                    {baseMedia ?
                    <FMedia style={MainStyles.borderRadius2} srcString={baseMedia}/>
                    :
                    <Icon name="image" type="material"/>}
                  </TouchableOpacity>
                </View>
              </Neumorphic>
              <FText style={{textAlign: 'center', fontSize: 20}}>
                Mask Face
              </FText>
              <Neumorphic style={[{padding: 5}, MainStyles.borderRadius2]}>
                <View>
                  <TouchableOpacity onPress={() => pickMedia(setElevatedState, (media) => changeMaskFiles([media]))}>
                    {maskFiles.length > 0 ?
                    <FMedia style={MainStyles.borderRadius2} srcString={maskFiles[0]}/>
                    :
                    <Icon name="image" type="material"/>}
                  </TouchableOpacity>
                </View>
              </Neumorphic>
            </View>
            <View style={{flex: 2, marginTop: 20, flexDirection: 'row'}}>
              <View style={{flex: 1}}></View>
              <View style={{flex: 4}}>
                <FButton onPress={() => setFetching(true)} disabled={fetching}
                style={[{width: 'auto', padding: 10}, MainStyles.borderRadius2, MainStyles.center]}>
                  <FText style={{fontSize: 20, fontWeight: 'bold'}}>Load</FText>
                </FButton>
              </View>
              <View style={{flex: 1}}></View>
            </View>
          </View>}
        </View>
      </Neumorphic>
    </GestureRecognizer>
  );
}
