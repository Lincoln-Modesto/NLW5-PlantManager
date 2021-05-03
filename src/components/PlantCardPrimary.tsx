import React from 'react'
import {Text, 
        View,
        StyleSheet,
} from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'

interface PlantProps extends RectButtonProps{
    data:{
        name: string;
        photo: string;
    }
}

export const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {
    return(
        <RectButton style={styles.container} {...rest}>

            <SvgFromUri 
            uri={data.photo} 
            width={70} 
            height={70}/>

            <Text style={styles.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        maxWidth: '45%',
        borderRadius: 20,
        paddingVertical: 10,
        margin: 10,
        alignItems: 'center',
        backgroundColor: colors.shape
    },
    text:{
        textAlign: 'center',
        color: colors.green_dark,
        marginVertical: 16,
        fontWeight: 'bold'
    }
})