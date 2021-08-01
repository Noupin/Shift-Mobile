/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import React, { FC, useState, useEffect } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import { useTheme } from '@react-navigation/native';

//First Party Imports
import { useInterval } from "../Hooks/Interval";
import { FMedia } from '../Components/Media';
import { FButton } from '../Components/Button';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { CombinedInferenceResponse } from '../Interfaces/CombinedInference';
import { InferenceOperationRequest, InferenceRequest,
				 InferenceStatusRequest } from '../Swagger';
//import { Loader } from "../../Components/Loader/Loader";
import { useFetch } from '../Hooks/Fetch';
import { urlToFile } from "../Helpers/Files";
import { MainStyles } from '../Styles/MainStyles';
import { Neumorphic } from '../Components/Neumorphic';
import { FText } from '../Components/Text';


const handleDownload = async (imageURI: string, extension: string) => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: extension,
  })
    .fetch('GET', imageURI)
    .then(res => {
      CameraRoll.saveToCameraRoll(res.data)
        .catch(err => console.error(err))
    })
    .catch(error => console.error(error));
};

export const Inference: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const theme = useTheme()

	const [inferenceMedia, setInferenceMedia] = useState<File>();
	const [baseMediaString, setBaseMediaString] = useState("")

	const [inference, setInference] = useState(true);
	const [stopInference, setStopInference] = useState(false);
	const [updating, setUpdating] = useState(false);
  const [inferenceResponse, setInferenceResponse] = useState<CombinedInferenceResponse>();
	const [updateProgress, setUpdateProgress] = useState(false);

	const fetchInference = useFetch(elevatedState.APIInstances.Inference,
                                  elevatedState.APIInstances.Inference.inference,
                                  elevatedState, setElevatedState, setInferenceResponse, setInference)
	const fetchInferenceStatus = useFetch(elevatedState.APIInstances.Inference,
																				elevatedState.APIInstances.Inference.inferenceStatus,
																				elevatedState, setElevatedState, setInferenceResponse, setUpdateProgress)


	useEffect(() => {
		if(!inference) return;

		const inferenceRequestParams: InferenceRequest = {
      shiftUUID: elevatedState.shiftUUID,
			usePTM: elevatedState.frontEndSettings.usePTM,
			training: elevatedState.frontEndSettings.trainingShift,
			prebuiltShiftModel: elevatedState.prebuiltShiftModel
    };
    const inferenceBody: InferenceOperationRequest = {
      body: inferenceRequestParams
    }

    fetchInference(inferenceBody)

    setElevatedState((prev) => ({...prev, prebuiltShiftModel: ""}))
		setUpdating(true);
	}, [inference]);

	useEffect(() => {
		if(!inferenceResponse) return;

		setElevatedState((prev) => ({...prev, msg: inferenceResponse.msg!}));
	}, [inferenceResponse]);

	useInterval(async () => {
		if(updateProgress) return;

		if(updating || !stopInference){
			const inferenceStatusRequestParams: InferenceRequest = {
				shiftUUID: elevatedState.shiftUUID,
				usePTM: elevatedState.frontEndSettings.usePTM,
				training: elevatedState.frontEndSettings.trainingShift,
				prebuiltShiftModel: elevatedState.prebuiltShiftModel
			};
			const inferenceStatusBody: InferenceStatusRequest = {
				body: inferenceStatusRequestParams
			}
	
			await fetchInferenceStatus(inferenceStatusBody)

			if(inferenceResponse == null){
				return;
			}

			if(inferenceResponse.mediaFilename!){
				setInferenceMedia(await urlToFile(`/api/inference/content/${inferenceResponse.mediaFilename!}`,
													inferenceResponse.mediaFilename!))
				setBaseMediaString(`/api/inference/content/${inferenceResponse.baseMediaFilename!}`)
			}

			setStopInference(inferenceResponse.stopped!);

			if(stopInference){
				setUpdating(false);
			}
			else{
				setUpdating(true);
			}
		}
	}, 1000);


	return (
		<View style={[MainStyles.spreadColumn, {flex: 1, alignItems: 'center',
    justifyContent: 'center', marginTop: 10}]}>
      <View style={{flex: 9}}>
        <Neumorphic>
          <FMedia mediaSrc={inferenceMedia}/>
        </Neumorphic>
      </View>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <Icon name='north' type='material' color={theme.colors.text}/>
      </View>
      <View style={{flex: 9}}>
        <Neumorphic>
          <FMedia srcString={baseMediaString}/>
        </Neumorphic>
      </View>
      <View style={[MainStyles.spreadRow, {margin: 10}]}>
        <View style={{flex: 1, margin: 5, alignItems: 'stretch'}}>
          <FButton style={[MainStyles.borderRadius2, {justifyContent: 'center',
          alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', padding: 5}]}
          onPress={() => {
            const fileURL = URL.createObjectURL(inferenceMedia)
			const splitURL = fileURL.split(';')[0].split('/')
            handleDownload(fileURL, splitURL[splitURL.length - 1])
          }}>
            <FText>Download</FText>
            <Icon name="south" type="material" color={theme.colors.text}/>
          </FButton>
        </View>
      </View>
    </View>
	);
}