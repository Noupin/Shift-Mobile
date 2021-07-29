//Third Party Imports
import React, { FC, useRef } from 'react';
import Video, { VideoProperties } from 'react-native-video';


interface IVideo extends Omit<VideoProperties, 'source'>{
  videoSrc: string
}

export const FVideo: FC<IVideo> = ({videoSrc, style, ...props}) => {
  const video = useRef(null);

  return(
    <Video ref={video} style={{width: '100%', aspectRatio: 1, backgroundColor: "#ececec" }}
      source={{ uri: videoSrc }} resizeMode="contain" controls={true} {...props}/>
  );
}