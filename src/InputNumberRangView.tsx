import { Text, View, StyleSheet, TextInput, ViewStyle } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Toast } from '@ant-design/react-native'

interface Props {
    inputTitle: string // 标题
    initialStartValue?: string // 初始开始值
    initialEndValue?: string // 初始结束值
    onChangeStartValue?: (value) => void // 开始值监听
    onChangeEndValue?: (value) => void // 结束值监听

    minValue?: number // 最小输入值
    maxValue?: number // 最大输入值
    last?: boolean // 是否有底部分割线
    placeholderStr?: string // 开始输入框的提示语
    placeholderEnd?: string // 结束输入框的提示语
    style?: ViewStyle // 输入组件View样式
    leftStyle?: ViewStyle // 左边输入框样式
    rightStyle?: ViewStyle // 右边输入框样式
}

export const InputView: FC<Props> = observer(props => {
    const {
        inputTitle,
        last,
        initialStartValue,
        initialEndValue,
        onChangeEndValue,
        onChangeStartValue,
        placeholderStr,
        placeholderEnd,
        style,
        minValue,
        maxValue,
        leftStyle,
        rightStyle,
    } = props
    // 最大值和最小值默认初始值
    const maxVal = maxValue || 9999
    const minVal = minValue || 0

    const [startValue, setStartValue] = useState(initialStartValue)
    const [endValue, setEndValue] = useState(initialEndValue)
    // componentDidUpdate 监听父组件的props值 进行相应的更新
    useEffect(() => {
        setStartValue(initialStartValue)
        setEndValue(initialEndValue)
    }, [initialStartValue, initialEndValue])

    const isAbler = () => {
        if (startValue && endValue) {
            if (parseFloat(startValue) > parseFloat(endValue)) {
                Toast.info('最小值不能大于最大值')
            }
        }
    }
    const getValue = (val: string) => {
        let finalVal
        if (+val >= maxVal) {
            finalVal = maxVal.toString()
        } else if (+val < minVal) {
            finalVal = minVal.toString()
        } else {
            finalVal = val.replace(/[^\d]/g, '')
        }
        return finalVal
    }
    return (
        <View>
            <Text style={styles.titleText}>{inputTitle}</Text>
            <View style={[styles.inputWrapper, style]}>
                <TextInput
                    placeholder={placeholderStr}
                    onChangeText={val => {
                        setStartValue(getValue(val))
                        onChangeStartValue && onChangeStartValue(getValue(val))
                    }}
                    onBlur={isAbler}
                    value={startValue}
                    style={{ ...styles.inputSty, ...leftStyle }}
                />
                <View style={styles.dpDivider} />
                <TextInput
                    placeholder={placeholderEnd}
                    onChangeText={val => {
                        setEndValue(getValue(val))
                        onChangeEndValue && onChangeEndValue(getValue(val))
                    }}
                    onBlur={isAbler}
                    value={endValue}
                    style={{ ...styles.inputSty, ...rightStyle }}
                />
            </View>
            {!last && <View style={{ backgroundColor: '#d8d8d8', marginLeft: 25, height: 0.5 }} />}
        </View>
    )
})

const styles = StyleSheet.create({
    dpDivider: {
        backgroundColor: '#d8d8d8',
        height: 0.5,
        marginHorizontal: 12.5,
        width: 40,
    },
    inputSty: {
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        color: '#d8d8d8',
        height: 25,
        lineHeight: 25,
        padding: 0,
        textAlign: 'center',
        width: 122.5,
    },
    inputWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 25,
        paddingTop: 12,
    },

    titleText: {
        color: '#262626',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 25,
        marginTop: 12,
    },
})
