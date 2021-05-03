import React from 'react'
import {Text,
        SafeAreaView, 
        Image, 
        TouchableOpacity, 
        StyleSheet,
        Dimensions} from 'react-native'

import colors from '../styles/colors'
import wateringImg from '../../assets/watering.png'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'


export function Welcome () {

    const navigation = useNavigation();

    function handleStart (){
        navigation.navigate('UserIdentification');
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
            Gerencie {'\n'}
            suas plantas {'\n'}
            de forma fácil
            </Text> 

            <Image 
            style={styles.image} 
            source={wateringImg}
            resizeMode={'contain'}/>

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas. 
                Nós cuidamos de lembrar você sempre que precisar.</Text>

               <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleStart}>
                    <Feather 
                    name='chevron-right'
                    style={styles.iconButton}/>
                </TouchableOpacity> 
    
       </SafeAreaView>
    )
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.heading,
        paddingHorizontal: 20,
    },
    image: {
        height: Dimensions.get('window').width*0.7
    },
    iconButton: {
        textAlign: 'center',
        fontSize: 25,
        color: colors.white,
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 16,
        marginBottom: 20,
        height: 56,
        width: 56
    },
})