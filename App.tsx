import React, {useEffect} from 'react'
import * as Notifications from 'expo-notifications'

import Routes from './src/routes'
import { PlantProps } from './src/libs/Storage'

export default function App(){

 /* useEffect( () => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps
        console.log(data)
      })

    return () => subscription.remove()

  },[])*/

  return(
    <Routes/>
  )
}