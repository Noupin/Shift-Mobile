//Third Party Imports
import React, { FC, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Dimensions, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//First Party Imports
import { FButton } from '../Components/Button';
import { MainStyles } from '../Styles/MainStyles';
import { FTextInput } from '../Components/TextInput';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { useFetch } from '../Hooks/Fetch';
import { LoginOperationRequest, LoginRequest, LoginResponse } from '../Swagger';
import { Neumorphic } from '../Components/Neumorphic';


const LoginStyle = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    alignItems: "center",
  },
})


export const Login: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {
  const navigation = useNavigation()

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginErrors, setLoginErrors] = useState({
    username: false,
    password: false
  })
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [fetching, setFetching] = useState(false);
  const [loginResponse, setLoginResponse] = useState<LoginResponse>(); 
  const fetchLogin = useFetch(elevatedState.APIInstaces.Authenticate,
                              elevatedState.APIInstaces.Authenticate.login,
                              elevatedState, setElevatedState, setLoginResponse, setFetching)


  useEffect(() => {
    if(!fetching) return;

    setLoginErrors({
      username: false,
      password: false
    })
    setLoginErrorMessage("")

    const loginRequestParams: LoginRequest = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    }
    const loginBody: LoginOperationRequest = {
      body: loginRequestParams
    }
  
    fetchLogin(loginBody)
  }, [fetching]);

  useEffect(() => {
    if(!loginResponse) return;

    if(loginResponse.accessToken){
      setElevatedState(prev => ({...prev, accessToken: loginResponse.accessToken!}))
    }

    if(loginResponse.usernameMessage){
      setLoginErrors(prev => ({...prev, username: true}))
      setLoginErrorMessage(loginResponse.usernameMessage)
    }

    if(loginResponse.passwordMessage){
      setLoginErrors(prev => ({...prev, password: true}))
      setLoginErrorMessage(loginResponse.passwordMessage)
    }

  }, [loginResponse]);

  useEffect(() => {
    if(!elevatedState.accessToken) return;

    navigation.navigate("Home")
  }, [elevatedState.accessToken]);

  return (
      <View style={[LoginStyle.container]}>
        {loginErrorMessage !== "" ?
        <Neumorphic style={[{ margin: 10, padding: 15, flexDirection: 'row', backgroundColor: '#f8d7da',
        justifyContent: 'space-between', width: Dimensions.get('window').width*0.9}, MainStyles.borderRadius2]}>
          <FText>
            {loginErrorMessage}
          </FText>
          <Neumorphic>
            <FButton onPress={() => {
              setLoginErrorMessage("")
            }} style={[{padding: 10}, MainStyles.borderRadius2]}>
              <FText>Close</FText>
            </FButton>
          </Neumorphic>
        </Neumorphic> : null}
        <View></View>
        <View style={MainStyles.center}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 4}}>
              <FTextInput placeholder="Username/Email" onChangeText={setUsernameOrEmail}
                style={[{marginVertical: 10}, MainStyles.textCenter, MainStyles.borderRadius2]}
                autoCapitalize="none" autoCorrect={false} alignText="center" padding={10}
                value={usernameOrEmail}/>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 4}}>
              <FTextInput placeholder="Password" onChangeText={setPassword} value={password}
                style={[{marginVertical: 10}, MainStyles.textCenter, MainStyles.borderRadius2]}
                autoCapitalize="none" autoCorrect={false} alignText="center" padding={10}
                secureTextEntry={true}/>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 2}}>
              <FButton onPress={() => setFetching(true)}
              style={[{padding: 10, marginTop: 20}, MainStyles.borderRadius2, MainStyles.center]}>
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
