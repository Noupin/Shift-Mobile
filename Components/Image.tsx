//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import { Image, ImageProps } from 'react-native'


interface IImage extends ImageProps{
  imageSrc: string
}

export const FImage: FC<IImage> = ({imageSrc, style, source, ...props}) => {
  const [fullAspectRatio, setFullAspectRatio] = useState(1)

  useEffect(() => {
    Image.getSize(imageSrc, (width, height) => {setFullAspectRatio(width/height)})
  }, [imageSrc])

  return(
    <Image source={{ uri: imageSrc }} {...props}
      style={[{ width: '100%', maxHeight: '100%', alignSelf: 'center', aspectRatio: fullAspectRatio}, style]}/>
  );
}
