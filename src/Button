import { Text, StyleSheet, ViewStyle, TouchableOpacity, TextStyle } from 'react-native'
import React, { FC } from 'react'
import { observer } from 'mobx-react'
import LinearGradient from 'react-native-linear-gradient'

interface Props {
    // 按钮内容
    title: string
    // 尺寸
    size?: 'large' | 'small' | 'medium' | 'full'
    // 输入组件View样式
    style?: ViewStyle
    // Text style
    textStyle?: TextStyle
    // 按钮点击事件
    onPress?: () => void
    // 按钮渐变颜色
    colors?: string[]
    // 禁用
    disabled?: boolean
    // 渐变色线性方式-start
    linearStart?: { x: number; y: number }
    // 渐变色线性方式-end
    linearEnd?: { x: number; y: number }
}

export const Button: FC<Props> = observer(props => {
    const { title, size, style, onPress, colors, linearStart, linearEnd, textStyle, disabled } = props
    const getSize = (s: string) => {
        switch (s) {
            case 'full':
                return styles.touchBtnSty
            case 'large':
                return styles.actionBtn
            case 'medium':
                return styles.smallSty
            case 'small':
                return styles.actionBtn
            default:
                return styles.actionBtn
        }
    }
    const start = linearStart || { x: 0, y: 0 }
    const end = linearEnd || { x: 1, y: 0 }
    const color = colors || ['#0098ED', '#45C9FF']
    const btnSty = size ? getSize(size) : styles.actionBtn
    return (
        <TouchableOpacity activeOpacity={disabled ? 1 : 0.5} onPress={onPress}>
            <LinearGradient style={[btnSty, style, disabled && { opacity: 0.5 }]} start={start} end={end} colors={color}>
                <Text style={[styles.textSty, textStyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    actionBtn: {
        alignItems: 'center',
        borderRadius: 18,
        height: 36,
        justifyContent: 'center',
        width: global.windowWidth * 0.35,
    },
    smallSty: {
        alignItems: 'center',
        borderRadius: 14,
        height: 28,
        justifyContent: 'center',
        width: global.windowWidth * 0.2,
    },
    textSty: {
        color: '#fff',
        fontSize: 18,
    },
    touchBtnSty: {
        alignItems: 'center',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        width: global.windowWidth * 0.85,
    },
})
