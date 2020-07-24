import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { observer } from 'mobx-react'

export interface Props {
    checked?: boolean // 是否选中
    onPress?: (data?: any, index?: any) => void // 点击方法
    title: string // 按钮名称
    data?: any // 渲染按钮数据
    index?: any // 按钮索引
    fontSize?: number // 按钮文字大小
    backgroundColor?: string // 按钮背景色
    checkedBackgroundColor?: string // 按钮选择背景色
    textColor?: string // 按钮文字颜色
    checkedTextColor?: string // 按钮选择文字颜色
    fixedWidth?: number // 按钮宽度
    style?: ViewStyle
}

export const TagView = observer((props: Props) => {
    const {
        title,
        data,
        index,
        checked,
        style,
        onPress,
        checkedBackgroundColor,
        backgroundColor,
        textColor,
        checkedTextColor,
        fixedWidth,
        fontSize,
    } = props
    const styleWrapper: ViewStyle = {
        backgroundColor: checked ? checkedBackgroundColor : backgroundColor,
        paddingHorizontal: 8,
    }
    if (fixedWidth) {
        styleWrapper.width = fixedWidth
    }
    const check = checked || false
    return (
        <TouchableOpacity
            style={[styles.wrapper, style, styleWrapper]}
            disabled={!onPress}
            onPress={() => {
                onPress && onPress(data, index)
            }}
        >
            <Text style={[styles.text, { color: check ? checkedTextColor : textColor, fontSize: fontSize || 12 }]} numberOfLines={1}>
                {title}
            </Text>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    text: {
        color: 'rgb(155,155,155)',
        fontSize: 12,
        includeFontPadding: false,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: 'rgb(242,242,242)',
        borderRadius: 13,
        flexDirection: 'column',
        height: 26,
        justifyContent: 'center',
    },
})


