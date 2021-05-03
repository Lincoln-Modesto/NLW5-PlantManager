import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TouchableOpacityProps
} from 'react-native'

import Colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps {
    title: string
}

export function Button ( {title, ...rest} : ButtonProps){
    return(
        <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.9}
        {... rest}>
            <Text style={styles.textButton}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 56,
        backgroundColor: Colors.green,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    textButton:{
        fontSize: 16,
        color: Colors.white,
    }

})