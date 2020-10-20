import { Dimensions, Platform, StyleSheet } from 'react-native'
import ConfigReader from 'react-native-config-reader'

const { height, width } = Dimensions.get('window')

global.ios = Platform.OS === 'ios'
global.android = Platform.OS === 'android'
global.windowHeight = height
global.windowWidth = width
global.hairlineWidth = StyleSheet.hairlineWidth
global.BuildType = ConfigReader.BUILD_TYPE.toLowerCase()
global.avatarTimestamp = Date.now()


// 宽度小于 360 时 是否需要折叠
global.needWrap = width < 360
