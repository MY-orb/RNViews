interface Global {
    /**
     * 系统是iOS
     */
    ios: boolean
    /**
     * 系统是否是 android
     */
    android: boolean
    /**
     * 获取屏幕高度，含 statusBar 高度
     */
    windowHeight: number
    /**
     * 获取屏幕高度
     */
    windowWidth: number
    /**
     * 这一常量定义了当前平台上的最细的宽度。可以用作边框或是两个元素间的分隔线
     */
    hairlineWidth: number
    __DEV__: boolean
    /**
     * 利用 react-native-device-info 获取的设备信息
     */
    DeviceInfo: any
    /**
     * 利用 'react-native-config-reader' 获取的打包类型 staging、prerelease或者release
     */
    BuildType: string
    /**
     * @/sishu/apm 错误上报接口
     */
    errorReport: (errorObj: object, fatalLevel: number, errorInfo: object) => any
    sishuIM: import('SiShuIM.d.ts').SiShuIM
    loading: any
    userInfo: {
        status: number
        userId: string
        avatar: string
        name: string
        phone: string
    } | null
    rxdb: any
    IMCurrentStatus: string // IM客户端的状态
    tabBarName: string
    remarksList: any[] // 用于remark显示
    friendListInfo: any
    nickName: string // 人员的nickName
    avatarTimestamp: number // 用于头像显示

    /**
     * iPhone X 或者安卓手机的安全区域
     */
    StatusBarHeight: number
    containerMarginTop: number
    FooterHeight: number

    /**
     * 宽度小于 360 时 是否需要折叠
     */
    needWrap: boolean
}
declare const global: Global
