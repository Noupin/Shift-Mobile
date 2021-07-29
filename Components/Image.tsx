//Third Party Imports
import React, { FC } from 'react';
import { Image, ImageProps } from 'react-native'


interface IImage extends ImageProps{
  imageSrc: string
  width?: number
  height?: number
}

export const FImage: FC<IImage> = ({imageSrc, style, source, ...props}) => {

  return(
    <Image source={{ uri: imageSrc }} {...props}
      style={{ width: '100%', aspectRatio: 1, resizeMode: 'contain'}}/>
  );
}
