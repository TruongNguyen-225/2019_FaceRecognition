import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native';
import firebase from 'react-native-firebase';
import Search_TextInput from '../Header/Search_TextInput';
import icons_add from '../icons/icon_plus_big.png';
import icons_list from '../icons/icon_list.png';

const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

// var path = null
// const rootRef = firebase.database ().ref ();
// var system =rootRef.child ('attendance system');
var system = firebase.database ().ref ().child('aaaaa');
// var  system = ''
// system = firebase.database().ref().child('users/' + this.state.newClassName)

// writeUserData = () => {
//   system = firebase.database().ref().child('users/' + this.state.newClassName)
//   Alert.alert(this.state.newClassName)
// }
export default class CreateClass extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {currentUser: null};
  constructor (props) {
    super (props);
    this.state = {
      class: [],
      newClassName: '',
      loading: false,
      className: '',
      Subject:'',
      path:'',
    
    };
  }
  // componentDidMount () {
  //   const {currentUser} = firebase.auth ();
  //   this.setState ({currentUser});
  // }
  componentDidMount () {
    const {currentUser} = firebase.auth ();
    this.setState ({currentUser});

    system.on ('value', childSnapshot => {
      const classRoom = [];
      childSnapshot.forEach (doc => {
        classRoom.push ({
          key: doc.key,
          className: doc.toJSON ().className,
        });
        this.setState ({
          class: classRoom.sort ((a, b) => {
            return a.className > b.className;
          }),
          loading: false,
        });
      });
    });
  }
  // system = rootRef.child ( this.state.currentUser && this.state.currentUser.email);
 
  onPressAdd = () => {
      // path = String(this.state.currentUser.email)
      // system =rootRef.child (path);
    // this.setState({path:this.state.currentUser.email})
    // path =  this.s
//  system = firebase.database ().ref ().child(this.state.path)
// path = JSON.stringify(this.state.currentUser&&this.state.currentUser.email)
      // console.log('path------------------',path)
    if (this.state.newClassName.trim () === '') {
      alert ('class name is blank');
      return;
    }
    try {
      // var classNameFull = ''
      // classNameFull = this.state.newClassName 
      system.push ({
        className: this.state.newClassName.concat(' - ').concat(this.state.Subject)
      });
    } catch (e) {
      alert (e);
    }
  };
  onGoToDetail = () => {
    const {className} = this.state.class;
    if (this.state.newClassName != '') {
      alert (this.state.newClassName);
      this.props.navigation.navigate ('CLASS_DETAILS', {
        thamso: this.state.newClassName,
      });
    }
  };
  render () {
    const { currentUser }= this.state ;
    return (
      <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0}}>
        <StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
        <Search_TextInput />
      
        <View style={styles.viewCreateClass}>
      
          <TextInput
            style={styles.viewTextInput}
            keyboardType="default"
            placeholderTextColor="black"
            placeholder="Nhập tên lớp học"
            autoCapitalize="none"
            onChangeText={text => {
              this.setState ({newClassName: text});
            }}
            value={this.state.newClassName}
          />
          <View
            style={{marginRight: 10,width: 42, height: 42}}
            underlayColor="tomato"
            onPress={this.onPressAdd}
          >
            {/* <Image style={{width: 42, height: 42}} source={} /> */}
            <Text></Text>
          </View>
        </View>
        <View style={styles.viewCreateClass}>
          <TextInput
            style={styles.viewTextInput}
            keyboardType="default"
            placeholderTextColor="black"
            placeholder="Nhập tên môn học"
            autoCapitalize="none"
            onChangeText={text => {
              this.setState ({Subject: text});
            }}
            value={this.state.Subject}
          />
          <TouchableHighlight
            style={{marginRight: 10}}
            underlayColor="tomato"
            onPress={this.onPressAdd}
          >
            <Image style={{width: 42, height: 42}} source={icons_add} />
          </TouchableHighlight>
        </View>
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
        <View>
          <FlatList
            data={this.state.class}
            renderItem={({item, index}) => {
              return (
                <TouchableHighlight
                  style={styles.viewFlatList}
                  onPress={() =>
                    this.props.navigation.navigate ('CLASS_DETAILS', {
                      thamso: item.className,
                    })}
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
        <Text>{currentUser && currentUser.email}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  viewCreateClass: {
    backgroundColor: '#e2f1f8',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 64,
  },
  viewTextInput: {
    height: 40,
    width: 250,
    margin: 10,
    padding: 10,
    borderColor: 'green',
    borderWidth: 2,
  },
  viewFlatList: {
    height: 64,
    width: WIDTH,
    backgroundColor: '#f1f8e9',
    borderBottomColor: '#ba2d65',
    borderBottomWidth: 1,
    width: WIDTH,
    paddingLeft: 30,
    justifyContent: 'center',
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
