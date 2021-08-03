//Third Party Imports
import { Appearance, Dimensions } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

//First Party Imports
import { User } from "./Swagger";
import { IFrontEndSettings } from "./Interfaces/FrontEndSettings";
import { colorThemeTypeArray } from './Types/FrontEndTypes';


export const videoTypes = ['mp4', 'webm', 'ogg']
export const imageTypes = ['png', 'jpg', 'jpeg', 'heic']
export const validMediaFileExtesnions = ['png', 'jpg', 'jpeg', 'gif', 'heic', 'mp4', 'm4a', 'mov']

export const defaultShiftTitle = ""


export const TRAIN_STATUS_INTERVAL = 1000;

export const CATEGORIES_TO_GET = -1;
export const CATEGORY_HEIGHT = Dimensions.get('window').height/4
export const CATEGORIES_TO_REMOVE = ["Featured"]


export const DEFAULT_USER: User = {username: "", email: ""}

export const DEFUALT_FRONT_END_SETTINGS: IFrontEndSettings = {
  usePTM: true,
  trainingShift: false,
  trainView: 'basic',
  colorTheme: 'light',
  uiStyle: 'neumorphic',
  saveToAlbum: true,
}

export const NEXT_COLOR_THEME = {
  light: colorThemeTypeArray[0],
  dark: colorThemeTypeArray[2],
  adaptive: colorThemeTypeArray[1]
}

export const COLOR_THEME_ICON = {
  light: 'light-up',
  dark: 'moon',
  adaptive: 'smartphone',
}

export const COLOR_THEME_ICON_TYPE = {
  light: 'entypo',
  dark: 'entypo',
  adaptive: 'material',
}

export const COLOR_THEME_COLORS = {
  light: '#DF711B',
  dark: '#bca0dc',
}

export const isDarkMode = {
  light: () => false,
  dark: () => true,
  adaptive: () => {return Appearance.getColorScheme() === 'dark'},
}

export const RADIUS_SIZE = 25
export const TOP_BAR_SIZE = 30;

export const DARK_THEME = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#1f1f1f",
    text: "#ececec",
  },
}

export const LIGHT_THEME = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "#ececec",
    text: "#1f1f1f",
  },
}

export const ADDITIONAL_THEME_ATTRIBUTES = {
  true: {
    brightShadow: "rgba(255, 255, 255, 0.03)",
    dimShadow: "rgba(0, 0, 0, 0.4)",
    placeholderTextColor: '#ececec70',
    errorBackground: '#2e0001',
    errorText: '#db606d',
  },
  false: {
    brightShadow: "rgba(255, 255, 255, 0.4)",
    dimShadow: "rgba(0, 0, 0, 0.05)",
    placeholderTextColor: '#1f1f1f70',
    errorBackground: '#f8d7da',
    errorText: '#dc3545',
  }
}

export const API_BASE_URL = 'http://192.168.1.52'

export const GESTURE_CONFIG = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80
};

export const BOTTOM_SAFE_AREA_MARGIN = 34;

