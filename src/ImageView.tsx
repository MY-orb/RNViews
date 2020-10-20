import { ImageProps, Image } from 'react-native'
import React, { FC, useState } from 'react'
import { observer } from 'mobx-react'

export enum ImageDefaultType {
    DefaultPeriod = require('~/images/test.png'),
}

export const ImageView: FC<ImageProps> = observer(props => {
    const { defaultSource, style, source, resizeMode } = props
    const defaultImg = defaultSource || ImageDefaultType.DefaultPeriod
    const [sources, setSources] = useState(source)
    const resizeModes = resizeMode || 'cover'
    // onError 只能拦住uri打不开的情况，
    // defaultSource ios能拦住uri为空的情况，android拦不住
    if (source?.uri) {
        return <Image onError={() => setSources(defaultImg)} resizeMode={resizeModes} source={sources} style={style} />
    }
    return <Image resizeMode={resizeModes} source={defaultImg} style={style} />
})
