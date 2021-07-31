/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { useState, useEffect } from 'react';

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
import { View } from 'react-native';


export function Inference (props: IElevatedStateProps){
	const {elevatedState, setElevatedState} = props;

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
		<View></View>
	);
}