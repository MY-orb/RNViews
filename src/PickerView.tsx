import { Text, View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { observer } from 'mobx-react'
import { Picker } from '@ant-design/react-native'

interface Props {
    // 标题
    pickerTitle: string
    // 初始开始值
    initialValue: any[]
    // 开始值监听
    onChangePickerValue: (value) => void
    // picker数据
    data: any[]
    // 输入组件View样式
    style?: ViewStyle
    // 左边输入框样式
    leftStyle?: ViewStyle
    // 右边输入框样式
    rightStyle?: ViewStyle
    // 是否有下划线默认有
    last?: boolean
}

export const PickerViews: FC<Props> = observer(props => {
    const { pickerTitle, last, initialValue, data, onChangePickerValue } = props

    return (
        <View>
            <Text style={styles.titleText}>{pickerTitle}</Text>
            <View style={styles.inputWrapper}>
                <View style={styles.agentSelect}>
                    <Text style={{ color: initialValue.length ? '#888' : '#9B9B9B' }}>
                        {initialValue.length ? initialValue[0].split('-')[0] : '子机构选择'}
                    </Text>
                </View>
                <Picker data={data} cols={1} value={initialValue} onOk={onChangePickerValue}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.agentSelectText}>更换</Text>
                    </TouchableOpacity>
                </Picker>
            </View>
            {!last && <View style={{ backgroundColor: '#d8d8d8', marginLeft: 25, height: 0.5 }} />}
        </View>
    )
})

const styles = StyleSheet.create({
    agentSelect: {
        backgroundColor: 'rgba(242, 242, 242, 1)',
        borderRadius: 15,
        flex: 1,
        height: 30,
        overflow: 'hidden',
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    agentSelectText: {
        color: '#17AAFF',
        fontSize: 16,
        marginLeft: 10,
        width: 40,
    },
    dpDivider: {
        backgroundColor: '#d8d8d8',
        height: 0.5,
        marginHorizontal: 12.5,
        width: 40,
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
