import React, { useEffect, useState } from 'react'
import {Text,
        View,
        StyleSheet,
        Image} from 'react-native'
import colors from '../styles/colors'
import userImg from '../../assets/lincoln.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Header(){

    const[userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user= await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '')
        }
        loadStorageUserName();
    },[])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>
                    {userName}
                </Text>
            </View>
            
            <Image
            source={userImg}
            style={styles.image}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
    },
    userName:{
        fontSize: 32,
        color: colors.heading,
        fontWeight: 'bold',
        lineHeight: 40
    },
    image:{
        width: 80,
        height: 80,
        borderRadius: 40
    }

})