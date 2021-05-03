import React from 'react'
import {View,
        Text,
        SafeAreaView,
        StyleSheet} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import {Button} from '../components/Button'
import colors from '../styles/colors'

interface Params{
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;
}

const emojis = {
    smile: '😄',
    hug: '🤗'
}

export function Confirmation (){
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen,
    } = routes.params as Params

    function handleMoveOn(){
        navigation.navigate(nextScreen)
    }

    return(
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                <Text style={style.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={style.title}>
                    {title}
                </Text>
                <Text style={style.subtitle}>
                    {subtitle}
                </Text>
                <View style={style.footer}>
                     <Button 
                     title='Começar'
                     onPress={handleMoveOn}/>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 30,
    },
    title:{
        fontSize: 25,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 38,
        color: colors.heading,
    },
    subtitle:{
        fontSize: 17,
        paddingVertical:10,
        color: colors.heading,
        textAlign: 'center',
    },
    emoji:{
        fontSize: 78,
    },
    footer:{
        paddingHorizontal: 50,
        width: '100%',
        marginTop: 20
    },

})