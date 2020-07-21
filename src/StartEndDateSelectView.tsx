import { Text, View, StyleSheet, ViewStyle } from 'react-native'
import dayJs from 'dayjs'
import React, { useState, useEffect, useMemo } from 'react'
import { DatePicker } from '@ant-design/react-native'
import { observer } from 'mobx-react'

interface Props {
    minDate?: Date // 最小时间值
    maxDate?: Date // 最大时间值
    onChangeStartDate?: (value) => void // 开始时间监听
    onChangeEndDate?: (value) => void // 结束时间监听
    initialStartTime?: Date // 默认开始时间
    initialEndTime?: Date // 默认结束时间
    style?: ViewStyle
    format?: string // 时间格式
    timeText?: string // 时间选择提示文字
    last?: boolean // 是否有底部分割线 true-无分割线
}

// 时间初始值处理
const customTime = (time, format) => {
    if (time) return dayJs(time).format(format)
}

export const TimeView = observer((props: Props) => {
    const { minDate, maxDate, initialStartTime, initialEndTime, timeText, last, onChangeStartDate, onChangeEndDate, style, format } = props
    const [startTime, setStartTime] = useState(initialStartTime)
    const [endTime, setEndTime] = useState(initialEndTime)
    const formatStr = format || 'YYYY-MM-DD'
    // componentDidUpdate 监听父组件的props值 进行相应的更新
    useEffect(() => {
        setStartTime(initialStartTime)
        setEndTime(initialEndTime)
    }, [initialStartTime, initialEndTime])

    // 依赖函数优化，去除多余渲染
    const startTimeStr = useMemo(() => customTime(startTime, formatStr), [startTime])
    const endTimeStr = useMemo(() => customTime(endTime, formatStr), [endTime])

    return (
        <View>
            <Text style={styles.titleText}>{timeText}</Text>
            <View style={[styles.datePickerWrapper, style]}>
                <DatePicker
                    style={{ width: 122.5 }}
                    mode="date"
                    value={startTime || new Date()}
                    minDate={
                        minDate ||
                        dayJs()
                            .subtract(1, 'year')
                            .startOf('year')
                            .toDate()
                    }
                    maxDate={
                        maxDate ||
                        dayJs()
                            .add(1, 'year')
                            .endOf('year')
                            .toDate()
                    }
                    onChange={value => {
                        setStartTime(value)
                        onChangeStartDate && onChangeStartDate(value)
                    }}
                >
                    <Text style={styles.startTimeStyle}>{startTime ? startTimeStr : '开始日期'}</Text>
                </DatePicker>
                <View style={styles.dpDivider} />
                <DatePicker
                    style={{ width: 122.5 }}
                    mode="date"
                    value={endTime || new Date()}
                    minDate={
                        startTime ||
                        minDate ||
                        dayJs()
                            .subtract(1, 'year')
                            .startOf('year')
                            .toDate()
                    }
                    maxDate={
                        maxDate ||
                        dayJs()
                            .add(1, 'year')
                            .endOf('year')
                            .toDate()
                    }
                    onChange={value => {
                        setEndTime(value)
                        onChangeEndDate && onChangeEndDate(value)
                    }}
                >
                    <Text style={styles.endTimeStyle}>{endTime ? endTimeStr : '结束日期'}</Text>
                </DatePicker>
            </View>
            {!last && <View style={{ backgroundColor: '#d8d8d8', marginLeft: 25, height: 0.5 }} />}
        </View>
    )
})
const styles = StyleSheet.create({
    datePickerWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 25,
        paddingTop: 12,
    },
    dpDivider: {
        backgroundColor: '#d8d8d8',
        height: 0.5,
        marginHorizontal: 12.5,
        width: 40,
    },
    endTimeStyle: {
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        color: '#d8d8d8',
        lineHeight: 25,
        overflow: 'hidden',
        textAlign: 'center',
        width: 122.5,
    },
    startTimeStyle: {
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        color: '#d8d8d8',
        lineHeight: 25,
        overflow: 'hidden',
        textAlign: 'center',
        width: 122.5,
    },
    titleText: {
        color: '#262626',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 25,
        marginTop: 12,
    },
})
