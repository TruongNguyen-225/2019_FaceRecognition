import AsyncStorage from '@react-native-community/async-storage'

export const setItemToAsyncStorage = async ( item,value) =>{
    await AsyncStorage.setItem(item, JSON.stringify(value))
  }

