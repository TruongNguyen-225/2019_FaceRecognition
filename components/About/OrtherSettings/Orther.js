import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import icons_logout from '../../icons/icons8-shutdown-96.png';

const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

export default class App extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super ();
    this.state = {
      currentUser: null,
    };
  }
  static navigationOptions = {
    header: null,
  };
  componentDidMount () {
    const {currentUser} = firebase.auth ();
    this.setState ({currentUser});
  }
  goBackToMain () {
    return this.props.navigation.navigate ('HOME');
  }
  onLogOut = () => {
    firebase
    .auth()
    .signOut()
    .then(
      () => {
        this.props.navigation.navigate("Ma");
      })
  };
  
  render () {
    const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.viewTouchable}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 20,
              }}
            >

              <Image style={styles.avt} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.username}>
                {currentUser && currentUser.email}
              </Text>
            </View>

          </TouchableOpacity>
        </View>

        <ScrollView>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate ('UPDATE')}
            >
              <View style={styles.rowCreateClass}>
                <View style={styles.viewImgIcon}>
                  <Image
                    source={icons_logout}
                    style={{height: 45, width: 45}}
                  />
                </View>
                <View style={styles.viewText}>
                  <Text style={styles.textDirector}>
                    Cập Nhật Thông Tin
                  </Text>
                  <View style={{top: 2 * (HEIGHT / 10)}} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.onLogOut}>
              <View style={styles.rowCreateClass}>
                <View style={styles.viewImgIcon}>
                  <Image
                    source={icons_logout}
                    style={{height: 45, width: 45}}
                  />
                </View>
                <View style={styles.viewText}>
                  <Text style={styles.textDirector}>
                    Tùy Chỉnh Cài Đăt
                  </Text>
                  <View style={{top: 2 * (HEIGHT / 10)}} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.onLogOut}>
              <View style={styles.rowCreateClass}>
                <View style={styles.viewImgIcon}>
                  <Image
                    source={icons_logout}
                    style={{height: 45, width: 45}}
                  />
                </View>
                <View style={styles.viewText}>
                  <Text style={styles.textDirector}>
                    Đăng Xuất
                  </Text>
                  <View style={{top: 2 * (HEIGHT / 10)}} />
                </View>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  header: {
    height: HEIGHT / 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: WIDTH,
  },
  viewTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: WIDTH,
    height: HEIGHT / 5,
  },
  avt: {
    width: 100,
    height: 100,
    borderColor: 'red',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 50,
  },
  username: {
    width: WIDTH - WIDTH * 0.3 - 20,
    fontSize: 22,
    color: 'black',
  },
  list: {
    paddingVertical: 20,
    backgroundColor: '#f1f1f1',
    paddingLeft: 10,
  },
  rowCreateClass: {
    flexDirection: 'row',
    height: HEIGHT / 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingLeft: 20,
    backgroundColor: '#f1f1f1',
  },
  viewImgIcon: {
    justifyContent: 'center',
  },
  viewText: {
    height: HEIGHT / 10,
    justifyContent: 'center',
  },
  textDirector: {
    fontSize: 15,
    fontWeight: 'normal',
    margin: 10,
    paddingLeft: 10,
    position: 'absolute',
  },
});
