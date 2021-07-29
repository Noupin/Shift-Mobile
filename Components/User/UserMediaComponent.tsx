/* eslint-disable react-hooks/exhaustive-deps */

//Third Party Imports
import React, { FC, ReactElement} from 'react';
import { View } from 'react-native';

//First Party Imports
import { FMedia } from '../Media';
import { IElevatedStateProps } from '../../Interfaces/ElevatedStateProps';
import { FMediaPicker } from '../MediaPicker';
import { validateFileList } from '../../Helpers/Files';
import { API_BASE_URL, imageTypes } from '../../constants';
import { MainStyles } from '../../Styles/MainStyles';
import { Icon } from 'react-native-elements';
import { Neumorphic } from '../Neumorphic';


interface IUserMedia{
  setElevatedState: IElevatedStateProps["setElevatedState"]
  profilePictureURL: string
  editing: boolean
  setProfilePicture: React.Dispatch<React.SetStateAction<File | undefined>>
  setProfilePictureURL: React.Dispatch<React.SetStateAction<string>>
}


export const UserMediaComponent: FC<IUserMedia> = ({setElevatedState, profilePictureURL, editing, setProfilePicture, setProfilePictureURL}): ReactElement => {
  let profileMediaComponent = (
    <Neumorphic style={{padding: 5}}>
      <FMedia srcString={profilePictureURL} style={[MainStyles.borderRadius2]}/>
    </Neumorphic>
    //<FMedia srcString={`${API_BASE_URL}/api/content/video/default.mp4`} style={{padding: 10}}/>
  )

  if (editing){
    profileMediaComponent = (
      <View>
        <FMedia srcString={profilePictureURL} style={[MainStyles.borderRadius2]}/>
        {/*<FMediaPicker onPress={(file: File) => {
          const [filteredFiles, badExtensions] = validateFileList([file], imageTypes)

          if(badExtensions.length > 0){
            setElevatedState((prev) => ({...prev,
              msg: `The file type ${badExtensions[0]} is not allowed to be selected`}))
          }
          if(filteredFiles.length === 0){
            setProfilePicture(undefined)
          }
          else{
            setProfilePicture(filteredFiles[0])
            setProfilePictureURL(URL.createObjectURL(filteredFiles[0]))
          }
        }}>
          <Icon name="menu" size={20}/>
      </FMediaPicker>*/}
      </View>
    )
  }

  return profileMediaComponent
}