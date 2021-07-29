//Third Party Imports
import React, { FC, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions, useNavigation } from '@react-navigation/native';

//First Party Imports
import { FButton } from '../Components/Button';
import { MainStyles } from '../Styles/MainStyles';
import { HeaderBarStyle } from '../Styles/HeaderBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isDarkMode, TOP_BAR_SIZE } from '../constants';
import { IElevatedStateProps } from '../Interfaces/ElevatedStateProps';
import { useTheme } from '@react-navigation/native';
import { Neumorphic } from '../Components/Neumorphic';
import { FText } from '../Components/Text';


interface ITemplate extends IElevatedStateProps{
  component: JSX.Element
}

export const Template: FC<ITemplate> = ({ component, elevatedState }) => {
  const navigation = useNavigation();
  const theme = useTheme()

  const [showMsg, setShowMsg] = useState(false);


  useEffect(() => {
    if(!elevatedState.msg) return;

    setShowMsg(true);
  }, [elevatedState.msg]);


  return (
    <SafeAreaView style={[MainStyles.container, {width: "100%"}]}>
      <View style={[MainStyles.container, {width: "100%"}]}>
        <View style={HeaderBarStyle.container}>
          <FButton style={[MainStyles.borderRadiusC, {padding: 5}]}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon name='menu' size={20} color={theme.colors.text}/>
          </FButton>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image style={{height: TOP_BAR_SIZE, width: TOP_BAR_SIZE}}
              source={isDarkMode[elevatedState.frontEndSettings.colorTheme]() ?
              require('../assets/darkIcon.png') : require('../assets/lightIcon.png')}/>
          </TouchableOpacity>
          <FButton style={[MainStyles.borderRadiusC, {padding: 5}]}
          onPress={() => navigation.navigate("Settings")}>
            <Icon name='settings' size={20} color={theme.colors.text}/>
          </FButton>
        </View>
        {showMsg ?
        <Neumorphic style={[{alignSelf: 'stretch', margin: 10, padding: 15, flexDirection: 'row',
        justifyContent: 'space-between', width: Dimensions.get('window').width*0.9}, MainStyles.borderRadius2]}>
          <FText>
            {elevatedState.msg}
          </FText>
          <Neumorphic>
            <FButton onPress={() => setShowMsg(false)} style={[{padding: 10}, MainStyles.borderRadius2]}>
              <FText>Close</FText>
            </FButton>
          </Neumorphic>
        </Neumorphic> : null}
        <View style={[MainStyles.container, {justifyContent: 'space-between'}]}>
          {component}
        </View>
      </View>
    </SafeAreaView>
  );
}
