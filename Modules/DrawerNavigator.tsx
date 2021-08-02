//Third Party Imports
import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps,
         DrawerContentOptions } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';

//First Party Imports
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { Template } from './Template';
import { DrawerStyles } from '../Styles/DrawerStyles';
import { DARK_THEME, isDarkMode, LIGHT_THEME } from '../constants';
import { LowerNavComponent } from '../Components/LowerNavComponent';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { FText } from '../Components/Text';
import { Settings } from './Settings';
import { Inference } from './Inference';
import { User } from './User';
import { Shift } from './Shift';


const Drawer = createDrawerNavigator();

interface ICustomDrawer extends IElevatedStateProps, DrawerContentComponentProps<DrawerContentOptions>{}

const CustomDrawer: FC<ICustomDrawer> = ({elevatedState, setElevatedState, navigation, ...props}) => {

  return (
    <SafeAreaView style={DrawerStyles.container}>
      <View style={DrawerStyles.container}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <FText style={DrawerStyles.button}>Home</FText>
          </TouchableOpacity>
          {elevatedState.authenticated && <>
          <TouchableOpacity onPress={() => {
            navigation.navigate("User", {username: elevatedState.currentUser.username})
          }}>
            <FText style={DrawerStyles.button}>Profile</FText>
          </TouchableOpacity>
          </>}
        </View>
        <LowerNavComponent elevatedState={elevatedState} setElevatedState={setElevatedState}
          navigation={navigation} {...props}/>
      </View>
    </SafeAreaView>
  );
}

export const DrawerNavigator: FC<IElevatedStateProps> = ({elevatedState, setElevatedState}) => {

  return (
    <Drawer.Navigator initialRouteName="Home"
    drawerStyle={[isDarkMode[elevatedState.frontEndSettings.colorTheme]() ? 
      {backgroundColor: DARK_THEME.colors.background} : 
      {backgroundColor: LIGHT_THEME.colors.background}]}
    drawerContent={(props) =>
    <CustomDrawer elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>}>
      <Drawer.Screen name="Home">
        {(props) => (
        <Template elevatedState={elevatedState} setElevatedState={setElevatedState}>
          <Home startLoading={props.route.params && (props.route.params as {startLoading: boolean}).startLoading ? (props.route.params as {startLoading: boolean}).startLoading : false}
            elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>
        </Template>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Login">
        {(props) => (
        <Template elevatedState={elevatedState} setElevatedState={setElevatedState}>
          <Login elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>
        </Template>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Register">
        {(props) => (
        <Template elevatedState={elevatedState} setElevatedState={setElevatedState}>
          <Register elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>
        </Template>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Settings">
        {(props) => (
        <Template elevatedState={elevatedState} setElevatedState={setElevatedState}>
          <Settings elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>
        </Template>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Inference">
        {(props) => (
        <Template elevatedState={elevatedState} setElevatedState={setElevatedState}>
          <Inference elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>
        </Template>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="User">
        {(props) => (
        <Template elevatedState={elevatedState} setElevatedState={setElevatedState}>
          <User username={(props.route.params as {username: string}).username ? (props.route.params as {username: string}).username : ""}
            elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>
        </Template>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Shift">
        {(props) => (
        <Template elevatedState={elevatedState} setElevatedState={setElevatedState}>
          <Shift uuid={(props.route.params as {uuid: string}).uuid ? (props.route.params as {uuid: string}).uuid : ""}
            elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>
        </Template>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
