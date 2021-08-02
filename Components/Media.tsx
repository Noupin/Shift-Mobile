//Third Party Imports
import React, { FC } from 'react';
import { ImageProps } from 'react-native'
import { VideoProperties } from 'react-native-video'

//First Party Imports
import { FImage } from './Image';
import { FVideo } from './Video';
import { videoTypes } from '../constants';


interface IMediaImage extends ImageProps{
  mediaSrc?: File
  srcString?: string
  mediaType?: string
  width?: number
  height?: number
}

interface IMediaVideo extends Omit<VideoProperties, 'source'>{
  mediaSrc?: File
  srcString?: string
  mediaType?: string
  width?: number
  height?: number
}


export const FMedia: FC<IMediaImage | IMediaVideo> = ({mediaSrc, srcString, mediaType, ...props}) => {
  let imageProps = props as IMediaImage;
  let videoProps = props as IMediaVideo;

  let element: JSX.Element
  var mediaSrcString = srcString;

  if(!mediaSrcString){
    mediaSrcString = mediaSrc ? URL.createObjectURL(mediaSrc) : "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }


  if ((mediaSrc && videoTypes.indexOf(mediaSrc.name.split('.').pop()!) !== -1)
      || (srcString && srcString.indexOf('video') !== -1)){
    element = <FVideo videoSrc={mediaSrcString} {...videoProps}/>;
  }
  else{
    element = <FImage imageSrc={mediaSrcString} {...imageProps}/>
  }

  return (
    <>
      {element}
    </>
  );
}
