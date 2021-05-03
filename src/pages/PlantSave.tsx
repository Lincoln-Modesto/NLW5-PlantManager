import React, { useState } from 'react'
import {View,
        StyleSheet,
        Alert,
        ScrollView,
        Platform,
        TouchableOpacity,
        Image,
        Text} from 'react-native';
import {SvgFromUri} from 'react-native-svg'
import { Button } from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { PlantProps, savePlant } from '../libs/Storage';

import WaterDrop from '../../assets/waterdrop.png'
import colors from '../styles/colors';


interface Params{
    plant: PlantProps
}

export function PlantSave(){
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

    const routes = useRoute();
    const { plant } = routes.params as Params

    const navigation = useNavigation();

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if (Platform.OS == 'android'){
            setShowDatePicker(oldState => !oldState)
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Por favor, escolha uma data no futuro ⏰')
        }
        if(dateTime)
            setSelectedDateTime(dateTime)
    }

    function handlerOpenDateTimePickerForAndroid (){
        setShowDatePicker(oldState => !oldState)
    }

    async function handlerSave(){
        try{
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })       
            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Continuar',
                icon:'hug',
                nextScreen: 'MyPlants'
            });     
        }catch{
            Alert.alert('Não foi possível salvar 😢')
        }
    }

    return(
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}/>

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                        source={WaterDrop}
                        style={styles.tipImage}/>
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {   showDatePicker &&
                        <DateTimePicker
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}/>
                    }

                    {
                        Platform.OS == 'android' && (
                            <TouchableOpacity
                                style={styles.dataTimePickerButton} 
                                onPress={handlerOpenDateTimePickerForAndroid}>
                                <Text style={styles.dataTimePickerText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                            
                        )
                    }
                    <Button
                    title='Cadastrar planta'
                    onPress={handlerSave}/>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
        paddingHorizontal: 30,
        paddingVertical: 50
        },
    plantName:{
        fontWeight: 'bold',
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout:{
        textAlign: 'center',
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    controller:{
        backgroundColor: colors.white,
        padding:20,
    },
    tipContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.blue_light,
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage:{
        width: 56,
        height: 56
    },
    tipText:{
        flex:1,
        marginLeft: 20,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel:{
        textAlign: 'center',
        fontSize: 12,
        color: colors.heading,
        marginBottom: 5,
    },
    dataTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dataTimePickerText:{
        color: colors.heading,
        fontSize: 24,

    }
})
