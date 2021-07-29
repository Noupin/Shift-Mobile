//Third Party Imports
import React, { FC } from 'react';
import { useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//First Party Imports
import { FButton } from '../Components/Button';
import { MainStyles } from '../Styles/MainStyles';
import { FTextInput } from '../Components/TextInput';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';


const LoginStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: "center",
  },
})


export const Login: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const navigation = useNavigation()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loginErrors, setLoginErrors] = useState({
    username: false,
    password: false
  })
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  return (
      <View style={[LoginStyle.container]}>
        <View></View>
        <View style={MainStyles.center}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 4}}>
              <FTextInput placeholder="Username/Email" onChangeText={setUsername}
                style={[{marginVertical: 10}, MainStyles.textCenter, MainStyles.borderRadius2]}
                autoCapitalize="none" autoCorrect={false} alignText="center" padding={10}/>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 4}}>
              <FTextInput placeholder="Password" onChangeText={setPassword} value={password}
                style={[{marginVertical: 10}, MainStyles.textCenter, MainStyles.borderRadius2]}
                autoCapitalize="none" autoCorrect={false} alignText="center" padding={10}/>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 2}}>
              <FButton onPress={() => {}} style={[{padding: 10, marginTop: 20}, MainStyles.borderRadius2, MainStyles.center]}>
                <FText>Login</FText>
              </FButton>
            </View>
            <View style={{flex: 1}}></View>
          </View>
        </View>
        <FButton onPress={() => navigation.navigate("Register")} style={[{padding: 15, marginTop: 10}, MainStyles.borderRadius2]}>
          <FText>Don't Have An Account?</FText>
        </FButton>
      </View>
    );
}
