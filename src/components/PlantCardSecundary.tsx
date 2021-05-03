import React from 'react'
import {Text, 
        View,
        StyleSheet,
        Animated,
} from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import colors from '../styles/colors'
import { Feather } from '@expo/vector-icons'

interface PlantProps extends RectButtonProps{
    data:{
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void
}

export const PlantCardSecundary = ({ data, handleRemove, ...rest }: PlantProps) => {
    return(
        <Swipeable
        overshootRight={false}
        renderRightActions={ () => (
            <Animated.View>
                <View>
                    <RectButton
                        style={styles.buttonRemove}
                        onPress={handleRemove}
                    >
                        <Feather name='trash' size={32} color={colors.white}/>
                    </RectButton>
                </View>
            </Animated.View>
        )}
        >
            <RectButton style={styles.container} {...rest}>

                <SvgFromUri 
                uri={data.photo} 
                width={50} 
                height={50}/>

                <Text style={styles.text}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regar às 
                    </Text> 
                    <Text style={styles.time}>
                        {data.hour}
                    </Text> 
                </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical:25,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: colors.shape,
    },
    text:{
        flex:1,
        color: colors.heading,
        fontWeight: 'bold',
        fontSize: 17,
        paddingHorizontal: 10
    },
    details:{
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    timeLabel:{
        fontSize: 16,
        color: colors.body_light
    },
    time:{
        marginTop: 5,
        color: colors.body_dark,
        fontSize: 16,
    },
    buttonRemove:{
        width:100,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        right: 20
    }
})
