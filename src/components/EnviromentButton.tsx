import React from 'react'
import {Text,
        View,
        StyleSheet} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import colors from '../styles/colors'

interface EnviromentButtonProps extends RectButtonProps{
    title: string;
    active?: boolean
}

export function EnviromentButton( 
    {title, 
    active = false, 
    ... rest} : EnviromentButtonProps){
        return(

            <RectButton 
            style={[
                styles.container,
                active && styles.containerActive]}
            {...rest}>
                <Text style={[
                    styles.text,
                    active && styles.textActive]}>
                    {title}
                </Text>

            </RectButton>
        )

}

const styles = StyleSheet.create({
    text:{
        color: colors.heading
    },
    textActive:{
        color: colors.green_dark,
        fontWeight: 'bold'
    },
    container:{
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    containerActive:{
        backgroundColor: colors.green_light,
    }
})