
import React, {Component} from 'react';
import { View ,Text ,ScrollView,StyleSheet ,FlatList} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import Search_TextInput from '../Header/Search_TextInput';

export default class ListClass extends Component {
    static navigationOptions = {
        header: null,
    }
  render() {
    return (
        <View style ={{height:200,width: 300, borderColor:'red',borderWidth:2}}>
         <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
          <FlatList
    data={[{key: 'a'}, {key: 'b'}]}
    renderItem={({item}) => <Text>{item.key}</Text>}
  />
        </View>

    );
  }
}

const styles = StyleSheet.create({
  // viewScrollView:{
  //   flex:1,
  //   marginTop:100,
  //   borderColor:'red',
  //   borderWidth:2,
  //   height: 500,
  //   width: 300,

  // },
})