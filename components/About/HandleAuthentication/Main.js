import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import firebase from 'react-native-firebase';
import logoBack from '../../icons/icons8-double-left-96.png';
import AsyncStorage from '@react-native-community/async-storage';
import icons_logout from '../../icons/icons8-shutdown-96.png';
import settings from '../../icons/icons8-settings-96.png';
import history from '../../icons/icons8-order-history-96.png';
import profile from '../../icons/icons8-contact-details-96.png';

import aaa from '../../../images/samesamemon.jpg';


const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

const Header_Maximum_Height = 270;
//Max Height of the Header
const Header_Minimum_Height = 50;
//Min Height of the Header

export default class Main extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {currentUser: null};
  constructor () {
    super ();
    this.AnimatedHeaderValue = new Animated.Value (0);
    this.state={
      userData: {},
      currentItemId:'',
    }
  }
  async componentDidMount () {
    await AsyncStorage.getItem('userData').then((value) => {
			const userData = JSON.parse(value);
			this.setState({
				currentItemId: this.state.currentItemId,
				userData: userData
			});
			const shortEmail = this.state.userData.email.split('@').shift();
			this.setState({
		  email: this.state.userData.email,
				shortEmail: shortEmail
			});
			});
    
  }
  onSuccess = () => {
    Alert.alert (
      'Notice',
      'Bạn chắc chắn muốn đăng xuất ?',
      [
        {
          text: 'Cancle',
          onPress: () => {
            this.props.navigation.navigate ('Main');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.onLogOut()
          },
        },
      ],
      {cancelable: true}
    );
  };
  async onLogOut () {
    await AsyncStorage.clear ();

    this.props.navigation.navigate ('LogIn');
  }

  render () {
    const {currentUser} = this.state;
    const AnimateHeaderBackgroundColor = this.AnimatedHeaderValue.interpolate ({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: ['#03a9f4', '#00BCD4'],
      extrapolate: 'clamp',
    });

    const AnimateHeaderHeight = this.AnimatedHeaderValue.interpolate ({
      inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
      outputRange: [Header_Maximum_Height, Header_Minimum_Height],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.MainContainer}>

        <Animated.View
          style={[
            styles.Header,
            {
              height: AnimateHeaderHeight,
              backgroundColor: AnimateHeaderBackgroundColor,
            },
          ]}
        >
          <Text style={styles.HeaderInsideText}>
            {/* {this.state.userData ? this.state.userData.email:''} */}
          </Text>
          <Image
            source={aaa}
            style={{height: 270, width: WIDTH, position: 'absolute',opacity:0.75}}
          />
        </Animated.View>
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{paddingTop: Header_Maximum_Height}}
          onScroll={Animated.event ([
            {nativeEvent: {contentOffset: {y: this.AnimatedHeaderValue}}},
          ])}
        >
          <View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate ('Update_Info')}
              >
                <View style={styles.rowCreateClass}>
                  <View style={styles.viewImgIcon}>
                    <Image
                      source={profile}
                      style={{height: 40, width: 40}}
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
              <TouchableOpacity onPress={this.onSetting}>
                <View style={styles.rowCreateClass}>
                  <View style={styles.viewImgIcon}>
                    <Image
                      source={settings}
                      style={{height: 40, width: 40}}
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
              <TouchableOpacity onPress={this.onSetting}>
                <View style={styles.rowCreateClass}>
                  <View style={styles.viewImgIcon}>
                    <Image
                      source={history}
                      style={{height: 40, width: 40}}
                    />
                  </View>
                  <View style={styles.viewText}>
                    <Text style={styles.textDirector}>
                      Lịch Sử Điểm Danh
                    </Text>
                    <View style={{top: 2 * (HEIGHT / 10)}} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={this.onSuccess}>
                <View style={styles.rowCreateClass}>
                  <View style={styles.viewImgIcon}>
                    <Image
                      source={icons_logout}
                      style={{height: 40, width: 40}}
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },
  content: {
    height: 45,
    backgroundColor: '#03a9f4',
    flexDirection: 'row',
    // position: 'absolute',
    zIndex: 2,
  },
  contentChild: {
    height: 45,
    width: WIDTH / 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  viewText: {
    height: 45,
    width: 140,
    marginLeft: (WIDTH - WIDTH / 10 - 140 - 40) / 2,
    justifyContent: 'center',
  },
  styleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
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
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: Platform.OS == 'ios' ? 20 : 0,
  },

  HeaderInsideText: {
    color: '#bb002f',
    fontSize: 21,
    textAlign: 'center',
    top: 50,
    zIndex: 2,
    position: 'relative',
  },

  TextViewStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    margin: 5,
    padding: 7,
  },
});
