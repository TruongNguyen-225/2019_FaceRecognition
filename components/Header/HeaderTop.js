import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  StatusBar
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');

export default class HeaderTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: '',
    };
  }

  render() {
    return (
      <View style={styles.topBar}>
        <StatusBar backgroundColor="#008ba3" barStyle="light-content" />

        <View style={styles.topBar1}>
          <View style={styles.iconMenu}>
            <TouchableOpacity
              onPress={() => {
                this.props.onOpen()
              }}
            >
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.slogan}>APP ĐIỂM DANH</Text>
          </View>
          <View style={styles.iconMenu}>
            <TouchableOpacity>
              {/* <Image source={ball} style={{height: 20, width: 20}} /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'column',
    width: WIDTH,
    height: HEIGHT / 18,
    backgroundColor: '#008ba3',
    paddingBottom: 10,
  },
  topBar1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingRight: 10,
    paddingLeft: 10,
  },
  slogan: {
    fontSize: 18,
    color: 'white',
  },

});
