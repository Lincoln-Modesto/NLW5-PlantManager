import React, { useState } from 'react';
import {Text,
        StyleSheet,
        SafeAreaView,
        TextInput,
        KeyboardAvoidingView,
        View,
        TouchableWithoutFeedback,
        Platform,
        Keyboard,
        Alert} from 'react-native';

import { useNavigation } from '@react-navigation/core';       
import {Button} from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';

export function UserIdentification () {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    function handleInputBlur (){
        setIsFocused(false)
        setIsFilled(!!name)
    }

    
    function handleInputFocus (){
        setIsFocused(true)
    }

    function handleInputchange (value: string){
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit (){
        if(!name)
            return Alert.alert('Me diz como chamar você 😢')

        try{
            await AsyncStorage.setItem('@plantmanager:user', name)
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                icon:'smile',
                nextScreen: 'PlantSelect'
            });
        }catch{
            return Alert.alert('Não foi possível salvar o seu nome 😢')
        }
    }

    return(
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.emoji}>
                                {isFilled ? '😄' : '😬'} 
                            </Text>

                            <Text style={styles.title}>
                                Como podemos {'\n'}
                                chamar você?
                            </Text>
                        </View>
                        <TextInput 
                        style={
                            [styles.input, (isFocused || isFilled) && {borderColor: colors.green}]}
                        placeholder='Digite seu nome'
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        onChangeText={handleInputchange}
                        />

                        <View style={styles.footer}>
                            <Button
                            title='Confirmar'
                            onPress={handleSubmit}/>
                        </View>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },
    content:{
        flex: 1,
        width: '100%',
    },
    form:{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 54,
        justifyContent: 'center',
    },
    header:{
        alignItems: 'center'
    },
    emoji:{
        fontSize: 44
    },
    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        padding: 10
    },
    title:{
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 32,
        marginTop: 20
    },
    footer:{
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }

})