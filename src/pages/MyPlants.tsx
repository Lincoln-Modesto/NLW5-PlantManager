import React, { useEffect, useState, version } from 'react'
import {Text,
        View,
        StyleSheet,
        Image,
        FlatList,
        Alert} from 'react-native'

import colors from '../styles/colors'
import WaterDrop from '../../assets/waterdrop.png'

import { Header } from '../components/Header'
import { loadPlant, PlantProps, removePlant } from '../libs/Storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import { PlantCardSecundary } from '../components/PlantCardSecundary'
import { Load } from '../components/Load'

export function Myplants(){
    const [myPlants, setMyplants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<String>();

    function handleRemove(plant:PlantProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel'
            },
            {
                text: 'Sim 😢',
                onPress:async () => {
                    try{
                        await removePlant(plant.id)
                        setMyplants( (oldData) => 
                        oldData.filter((item) => item.id != plant.id)
                        )
                    }catch(error){
                        Alert.alert('Não foi possível remover')
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nexTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            )
            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nexTime}`
            )

            setMyplants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();
    },[])

    if (loading) 
        return <Load/>

    return(
            <View style={styles.container}>

                <Header/>
                <View style={styles.content}>
                <View style={styles.spotlight}>
                    <Image source={WaterDrop}
                            style={styles.spotlightImage}/>
                    <Text style={styles.spotlightText}>
                        {nextWatered}
                    </Text>
                </View>
                </View>

                <View style={styles.plants}>
                    <Text style={styles.plantsTitle}>
                        Próximas regadas
                    </Text>

                    <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecundary 
                        data={item}
                        handleRemove={()=> {handleRemove(item)}}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    
                    />

                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    content:{
        paddingHorizontal: 30,
        marginTop: 20,
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        height: 110,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        justifyContent:'space-between'
    },
    spotlightImage:{
        width: 60,
        height: 60,
    },
    spotlightText:{
        color: colors.blue,
        paddingHorizontal: 5,
        fontSize: 14,
        marginRight: 40
    },
    plants:{
        flex: 1,
        width: '100%'
    },
    plantsTitle:{
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.heading,
        paddingVertical: 30
    },

})