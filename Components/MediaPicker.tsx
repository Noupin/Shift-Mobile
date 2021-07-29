//Third Party Imports
import React, { FC } from 'react';

//First Party Imports
import { FButton, IButton } from './Button';
import { urlToFile } from '../Helpers/Files';


interface IMediaPicker extends IButton{}


export const FMediaPicker: FC<IMediaPicker> = ({onPress, children, ...props}) => {

  const pickMedia = async () => {
    let result = {cancelled: false, uri: ""}


    if (!result.cancelled && onPress) {
      onPress(await urlToFile(result.uri))
    }
  };
  
  return (
    <FButton onPress={() => {pickMedia()}} {...props}>
      {children}
    </FButton>
  );
}