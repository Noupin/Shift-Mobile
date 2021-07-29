//Third Party Imports
import React, { FC, useRef, useState } from 'react';
import Video, { VideoProperties } from 'react-native-video';


interface IVideo extends Omit<VideoProperties, 'source'>{
  videoSrc: string
}

export const FVideo: FC<IVideo> = ({videoSrc, style, ...props}) => {
  const [fullAspectRatio, setFullAspectRatio] = useState(1)
  const video = useRef(null);

  return(
    <Video ref={video} source={{ uri: videoSrc }} resizeMode="cover" controls={true}
      style={[{ width: '100%', maxHeight: '100%', alignSelf:
        'center', aspectRatio: fullAspectRatio}, style]}
      onLoad={response => {
        const { width, height } = response.naturalSize;
        setFullAspectRatio(width/height)
      }} {...props}/>
  );
}