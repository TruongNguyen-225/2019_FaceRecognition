import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Dimensions,

} from 'react-native';
import OfflineNotice  from './OfflineNotice';
import Search_TextInput from './Header/Search_TextInput';
import firebase from 'react-native-firebase';

import icon_plus from './icons/icon_plus_big.png';
import icons_list from './icons/icon_list.png';

const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

const rootRef = firebase.database ().ref ();
const system = rootRef.child ('users/1212');

export default class HomeScreen extends Component {
  state = {currentUser: null};
  static navigationOptions = {
    header: null,
  };
  constructor () {
    super ();
    this.state = {
      show: false,
      show1: false,
      showViewCreateClass: false,
      class: [],
      className: '',
    };
  }
  componentDidMount () {
    system.on ('value', childSnapshot => {
      const classRoom = [];
      childSnapshot.forEach (doc => {
        classRoom.push ({
          key: doc.key,
          className: doc.toJSON ().className,
        });
        this.setState ({
          class: classRoom.sort ((a, b) => {
            return a.className < b.className;
          }),
          loading: false,
        });
      });
    });
  }
  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState ({show: false});
    } else {
      this.setState ({show: true});
    }
  };
  ShowHideComponent1 = () => {
    if (this.state.show1 == true) {
      this.setState ({show1: false});
    } else {
      this.setState ({show1: true});
    }
  };
  // ShowHideComponent_createClass = () => {
  //   if (this.state.showViewCreateClass == true) {
  //     this.setState ({showViewCreateClass: false});
  //   } else {
  //     this.setState ({showViewCreateClass: true});
  //   }
  // };
  // onGoToDetail() {
  //   this.props.navigation.navigate ('CLASS_DETAILS',);
  // };
  render () {
    const viewHidden = (
      <View >
        <FlatList
          data={this.state.class}
          renderItem={({item, index}) => {
            return (
              <TouchableHighlight
                style={styles.viewFlatList}
                onPress={() => this.props.navigation.navigate ('HANDLE')}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'normal',
                    margin: 10,
                  }}
                >
                  {item.className}
                </Text>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    );
    const viewHidden_Loading = (
     
        <FlatList
          data={this.state.class}
          renderItem={({item, index}) => {
            return (
              <TouchableHighlight
                style={styles.viewFlatList}
                onPress={() => this.props.navigation.navigate ('FOLLOW_CLASS')}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'normal',
                    margin: 10,
                  }}
                >
                  {item.className}
                </Text>
              </TouchableHighlight>
            );
          }}
        />
    
    );
    // const addClassHidden = <CreateClass onGoToDetail={this.onGoToDetail.bind(this)} />;
    const showFlatListClass = this.state.show ? viewHidden : <View />;
    const showFlatListClass1 = this.state.show1 ? viewHidden_Loading : <View />;

    // const showViewCreateClass = this.state.showViewCreateClass
    //   ? addClassHidden
    //   : <View />;
    return (
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 34 : 0,
          position: 'absolute',
        }}
      >
        <StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
        <Search_TextInput onGoToSearch = {() => this.props.navigation.navigate('SEARCH')}/>
        <OfflineNotice/>
        <View style={styles.addClass}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate ('CREATE_CLASS')}
          >
            <View style={styles.rowCreateClass}>
              <View style={styles.viewImgIcon}>
                <Image source={icon_plus} style={{height: 45, width: 45}} />
              </View>
              <View style={styles.viewText}>
                <Text style={styles.textDirector}>
                  Thêm Lớp Mới
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        {/* <View>{showViewCreateClass}</View> */}
        <View>
          <TouchableHighlight onPress={this.ShowHideComponent1}>
            <View style={styles.rowCreateClass}>
              <View style={styles.viewImgIcon}>
                <Image source={icons_list} style={{height: 45, width: 45}} />
              </View>
              <View style={styles.viewText}>
                <Text style={styles.textDirector}>
                  Danh Sách Lớp Đang Xử Lí
                </Text>
                <View style={{top: 2 * (HEIGHT / 10)}} />
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View>{showFlatListClass1}</View>

        <View>
          <TouchableHighlight onPress={this.ShowHideComponent}>
            <View style={styles.rowCreateClass}>
              <View style={styles.viewImgIcon}>
                <Image source={icons_list} style={{height: 45, width: 45}} />
              </View>
              <View style={styles.viewText}>
                <Text style={styles.textDirector}>
                  Danh Sách Lớp Hiện Có
                </Text>
                <View style={{top: 2 * (HEIGHT / 10)}} />
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View>{showFlatListClass}</View>

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  addClass: {},
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
  viewScrollView: {
    flex: 1,
    marginTop: 100,
    borderColor: 'red',
    borderWidth: 2,
  },
  rowAbout: {
    flexDirection: 'row',
    height: HEIGHT / 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingLeft: 20,
    backgroundColor: '#f1f1f1',
    position: 'relative',
  },
});

// writeUserData = () => {
//   system = firebase.database().ref()('users/' + this.state.newClassName)
//   if (this.state.newClassName.trim () === '') {
//     alert ('class name is blank');
//     return;
//   }
//   system.push ({
//     className: this.state.newClassName,
//   });
//   // console.log('log ra',this.state.newClassName)
//   console.log('1')
//   console.log('1',system)

//   // Alert.alert(this.state.newClassName)
// }
