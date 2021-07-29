//Third Party Imports
import 'react-native-gesture-handler';
import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button, TextInput } from 'react-native';

//First Party Imports
import { MainStyles } from '../Styles/MainStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';


interface IHome extends IElevatedStateProps{}

export const Home: FC<IHome> = ({elevatedState, setElevatedState}) => {
  const navigation = useNavigation()

  const [title, setTitle] = useState("Start Title")
  const [text, setText] = useState("")

  return (
    <View>
      <FText>Home</FText>
    </View>
  );
}