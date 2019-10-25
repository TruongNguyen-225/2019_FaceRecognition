
import React, {Component} from 'react';
import { View ,Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Search_TextInput from '../Header/Search_TextInput';

export default class SearchScreen extends Component {
    static navigationOptions = {
        header: null,
    }
  render() {
    return (
        <View>
          <Search_TextInput/>
            <Text>This is SearchScreen Component</Text>
        </View>

    );
  }
}
