/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { Platform, TouchableOpacity, View } from 'react-native';

//First Party Imports
import { FMedia } from '../Media';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { pickMedia, validateFilenameList } from '../../Helpers/Files';
import { MainStyles } from '../../Styles/MainStyles';
import { Neumorphic } from '../Neumorphic';
import { validMediaFileExtesnions } from '../../constants';


interface IUserMedia{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  profilePictureURL: string
  editing: boolean
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>
  setProfilePictureURL: React.Dispatch<React.SetStateAction<string>>
}


export const UserMediaComponent: FC<IUserMedia> = ({setElevatedState, profilePictureURL, editing, setProfilePicture, setProfilePictureURL}): ReactElement => {
  function changeUserMedia(mediaList: ImageOrVideo[]){
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
      setProfilePicture("")
    }
    else{
      setProfilePicture(filteredFiles[0])
      setProfilePictureURL(filteredFiles[0])
    }
  }

  let profileMediaComponent = (
    <Neumorphic style={{padding: 5, ...MainStyles.borderRadius2}}>
      <FMedia srcString={profilePictureURL} style={[MainStyles.borderRadius2]}/>
    </Neumorphic>
  );

  if (editing){
    profileMediaComponent = (
      <View>
        <Neumorphic style={{padding: 5, ...MainStyles.borderRadius2}}>
          <TouchableOpacity onPress={() => pickMedia(setElevatedState, (media) => changeUserMedia([media]))}>
            <FMedia srcString={profilePictureURL} style={[MainStyles.borderRadius2]}/>
          </TouchableOpacity>
        </Neumorphic>
      </View>
    )
  }

  return profileMediaComponent
}