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
import { Load } from './Load';
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
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <FText style={DrawerStyles.button}>Test Page</FText>
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
      drawerContent={(props) => <CustomDrawer elevatedState={elevatedState} setElevatedState={setElevatedState} {...props}/>}>
      <Drawer.Screen name="Home">
        {() => <Template elevatedState={elevatedState} setElevatedState={setElevatedState}
        component={<Home elevatedState={elevatedState} setElevatedState={setElevatedState}/>}/>}
      </Drawer.Screen>
      <Drawer.Screen name="Login">
        {() => <Template elevatedState={elevatedState} setElevatedState={setElevatedState}
        component={<Login elevatedState={elevatedState} setElevatedState={setElevatedState}/>}/>}
      </Drawer.Screen>
      <Drawer.Screen name="Register">
        {() => <Template elevatedState={elevatedState} setElevatedState={setElevatedState}
        component={<Register elevatedState={elevatedState} setElevatedState={setElevatedState}/>}/>}
      </Drawer.Screen>
      <Drawer.Screen name="Settings">
        {() => <Template elevatedState={elevatedState} setElevatedState={setElevatedState}
        component={<Settings elevatedState={elevatedState} setElevatedState={setElevatedState}/>}/>}
      </Drawer.Screen>
      <Drawer.Screen name="Inference">
        {() => <Template elevatedState={elevatedState} setElevatedState={setElevatedState}
        component={<Inference elevatedState={elevatedState} setElevatedState={setElevatedState}/>}/>}
      </Drawer.Screen>
      <Drawer.Screen name="User">
        {() => <Template elevatedState={elevatedState} setElevatedState={setElevatedState}
        component={<User username={elevatedState.currentUser.username} elevatedState={elevatedState} setElevatedState={setElevatedState}/>}/>}
      </Drawer.Screen>
      <Drawer.Screen name="Shift">
        {() => <Template elevatedState={elevatedState} setElevatedState={setElevatedState}
        component={<Shift uuid={elevatedState.shiftUUID} elevatedState={elevatedState} setElevatedState={setElevatedState}/>}/>}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
