//Third Party Imports
import React, { FC, useState } from 'react';
import 'react-native-gesture-handler';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import ImagePicker from 'react-native-image-crop-picker';

//First Party Imports
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { GESTURE_CONFIG } from '../constants';
import { MainStyles } from '../Styles/MainStyles';
import { Neumorphic } from '../Components/Neumorphic';
import { Dimensions } from 'react-native';
import { FButton } from '../Components/Button';


export const Load: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const windowHeight = Dimensions.get('window').height

  const onSwipe = (direction: string) => {
    switch(direction){
      case "SWIPE_UP":
        setOpen(true)
        break;
      case "SWIPE_DOWN":
        setOpen(false)
        break;
    }
  }
  
  async function pickMedia(){
    await ImagePicker.openPicker({
      mediaType: 'any',
    }).then((media) => {
      console.log(media);
    }).catch((err) => {
      console.log(err)
    });
  }
  


  return (
    <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction)}
    config={GESTURE_CONFIG}
    style={{flex: 1}}>
      <Neumorphic style={[MainStyles.borderRadius5]}>
        <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}, open ? {height: windowHeight*0.88} : {height: windowHeight*0.1}]}>
          {!open &&
          <TouchableOpacity onPress={() => setOpen(prev => !prev)}>
            <FText style={{fontSize: 20}}>Load</FText>
          </TouchableOpacity>}
          {open && 
          <View style={{flexDirection: 'column'}}>
            <View>
              <FButton onPress={pickMedia}>
                <FText>Press Me</FText>
              </FButton>
            </View>
            <TouchableOpacity onPress={() => console.log("LOADINGIN")}>
              <FText style={{fontSize: 20}}>Load</FText>
            </TouchableOpacity>
          </View>}
        </View>
      </Neumorphic>
    </GestureRecognizer>
  );
}
