//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
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
import { useFetch } from '../Hooks/Fetch';
import { RegisterResponse, RegisterRequest, RegisterOperationRequest } from '../Swagger';


const RegisterStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: "center",
  },
})


export const Register: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const navigation = useNavigation()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registerErrors, setResigterErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  })
  const [registerErrorMessage, setResgisterErrorMessage] = useState("");

  const [fetching, setFetching] = useState(false);
  const [registerResponse, setRegisterResponse] = useState<RegisterResponse>();
  const fetchRegister = useFetch(elevatedState.APIInstaces.Authenticate,
                                 elevatedState.APIInstaces.Authenticate.register,
                                 elevatedState, setElevatedState, setRegisterResponse, setFetching)


  useEffect(() => {
    if(!fetching) return;

    setResigterErrors({
      username: false,
      email: false,
      password: false,
      confirmPassword: false
    })
    setResgisterErrorMessage("")

    if (password !== confirmPassword){
      setResigterErrors(prev => ({...prev, confirmPassword: true}))
      setResgisterErrorMessage("Make sure your passwords match.")
      setFetching(false)

      return;
    }

    const registerReqeustParams: RegisterRequest = {
      username: username,
      password: password,
      email: email
    }
    const registerBody: RegisterOperationRequest = {
      body: registerReqeustParams
    }

    fetchRegister(registerBody)
  }, [fetching]);

  useEffect(() => {
    if(!registerResponse) return;

    if(registerResponse.accessToken){
      setElevatedState(prev => ({...prev, accessToken: registerResponse.accessToken!}))
    }

    if(registerResponse.usernameMessage){
      setResigterErrors(prev => ({...prev, username: true}))
      setResgisterErrorMessage(registerResponse.usernameMessage)
    }

    if(registerResponse.emailMessage){
      setResigterErrors(prev => ({...prev, email: true}))
      setResgisterErrorMessage(registerResponse.emailMessage)
    }

    if(registerResponse.passwordMessage){
      setResigterErrors(prev => ({...prev, password: true}))
      setResgisterErrorMessage(registerResponse.passwordMessage)
    }
  }, [registerResponse]);

  useEffect(() => {
    if(!elevatedState.authenticated) return;

    navigation.navigate("Home")
  }, [elevatedState.authenticated]);


  return (
    <View style={[RegisterStyle.container]}>
      <View></View>
      <View style={MainStyles.center}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <FTextInput placeholder="Username" onChangeText={setUsername} value={username}
              style={[{marginVertical: 10}, MainStyles.center, MainStyles.borderRadius2]}
              autoCapitalize="none" autoCorrect={false} alignText="center" padding={10}/>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <FTextInput placeholder="Email" onChangeText={setEmail} value={email}
              style={[{marginVertical: 10}, MainStyles.center, MainStyles.borderRadius2]}
              autoCapitalize="none" autoCorrect={false} alignText="center" padding={10}/>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <FTextInput placeholder="Password" onChangeText={setPassword} value={password}
              style={[{marginVertical: 10}, MainStyles.center, MainStyles.borderRadius2]}
              autoCapitalize="none" autoCorrect={false} alignText="center" padding={10}
              secureTextEntry={true}/>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <FTextInput placeholder="Confirm Password" onChangeText={setConfirmPassword} value={confirmPassword}
              style={[{marginVertical: 10}, MainStyles.center, MainStyles.borderRadius2]}
              autoCapitalize="none" autoCorrect={false} alignText="center" padding={10}
              secureTextEntry={true}/>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 2}}>
            <FButton onPress={() => {}} style={[{padding: 10, marginTop: 20}, MainStyles.borderRadius2, MainStyles.center]}>
              <FText>Register</FText>
            </FButton>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>
      <FButton onPress={() => navigation.navigate("Login")}
        style={[{padding: 15, marginTop: 10}, MainStyles.borderRadius2]}>
        <FText>Already Have An Account?</FText>
      </FButton>
    </View>
    );
}
