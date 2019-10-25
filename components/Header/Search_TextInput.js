import React, {Component} from 'react';
import {View, Dimensions, TextInput, StyleSheet,StatusBar,Image} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');
import icons_search  from '../icons/icons8-search-96.png';

export default class Search_TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: '',
    };
  }

  render() {
    const {txtSearch} = this.state;
    return (
      <View style={styles.topBar}>
        <StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
        <View style={styles.topBar2} >
          <TextInput
            style={styles.textInput}
            placeholder={'What do you want ?'}
            placeholderTextColor={'#333'}
            underlineColorAndroid="transparent"
            value={txtSearch}
            onChangeText={text => {
              this.setState({txtSearch: text});
            }}
            onFocus={() => this.props.onGoToSearch()}
            // onSubmitEditing={this.onSearchProduct.bind(this)}
          >
          {/* <Image source ={icons_search} style={{height:25, width:25}}/> */}
          </TextInput>
          {/* <Image source ={icons_search} style={{height:25, width:25}}/> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'column',
    width: WIDTH,
    height: HEIGHT / 12,
    backgroundColor: '#03a9f4',
    paddingBottom: 8,
  },
  topBar2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textInput: {
    height: HEIGHT / 20,
    width: WIDTH * 0.8,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingVertical: 0,
    borderRadius : 20,
  },
});
