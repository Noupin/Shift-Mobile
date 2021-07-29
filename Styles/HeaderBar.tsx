//Third Party Imports
import { StyleSheet } from 'react-native';

//First Party Imports
import { TOP_BAR_SIZE } from '../constants';


export const HeaderBarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: TOP_BAR_SIZE,
        alignSelf: 'stretch',
        marginVertical: 10,
        paddingHorizontal: 15,
    },
})