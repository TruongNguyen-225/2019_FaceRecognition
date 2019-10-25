import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
// import firebase from 'react-native-firebase';
import Search_TextInput from '../Header/Search_TextInput';
import icons_list from '../icons/icon_list.png';
import samesame from '../../images/samesamemon.jpg';
import Tittle from '../global/Tittle';

const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

// const rootRef = firebase.database ().ref ();
// const system = rootRef.child ('attendance system');
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
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     header: (
  //       <View
  //         style={styles.viewText}
  //       >
  //         <Text style={styles.textDirector}>
  //           LIST STUDENT ATTENDED CLASS
  //         </Text>
  //       </View>
  //     ),
  //   };
  // };
  constructor (props) {
    super (props);
    this.state = {
      class: [],
      newClassName: '',
      loading: false,
      className: '',
      refesh: false,
    };
  }

  //   componentDidMount () {
  //     system.on ('value', childSnapshot => {
  //       const classRoom = [];
  //       childSnapshot.forEach (doc => {
  //         classRoom.push ({
  //           key: doc.key,
  //           className: doc.toJSON ().className,
  //         });
  //         this.setState ({
  //           class: classRoom.sort ((a, b) => {
  //             return a.className > b.className;
  //           }),
  //           loading: false,
  //         });
  //       });
  //     });
  //   }

  onPressAdd = () => {
    if (this.state.newClassName.trim () === '') {
      alert ('class name is blank');
      return;
    }
    try {
      system.push ({
        className: this.state.newClassName,
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
  refesh () {
    this.setState ({
      refesh: true,
    });
  }
  render () {
    return (
      <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0}}>
        <StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
        <Tittle onGoBack={() => this.props.navigation.goBack ()} />
        <ScrollView>
          <View style={{zIndex: 1}}>
            <FlatList
              refreshing={this.state.refesh} // 2 hàm cần thiết để làm fullFresh
              onRefresh={() => {
                this.refesh ();
              }}
              onEndReachedThreshold={-0.2} //2 hàm cần để khi lướt đến cuối trang thì sẽ load thêm dữ liệu :v
              onEndReached={() => {
                this.refesh ();
              }}
              data={[
                {
                  name: 'NGUYỄN VĂN TRƯỜNG',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'LẠI LÀ TRƯỜNG NỮA :)',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'NGUYỄN VĂN TRƯỜNG',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'LẠI LÀ TRƯỜNG NỮA :)',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'NGUYỄN VĂN TRƯỜNG',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'LẠI LÀ TRƯỜNG NỮA :)',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'NGUYỄN VĂN TRƯỜNG',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'LẠI LÀ TRƯỜNG NỮA :)',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'NGUYỄN VĂN TRƯỜNG',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
                {
                  name: 'LẠI LÀ TRƯỜNG NỮA :)',
                  mssv: '0550080038',
                  class: '05CNTT1',
                },
              ]}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate ('ATTENDANCE')}
                  >
                    <View style={styles.row}>
                      <View style={styles.left}>
                        <Image
                          style={{
                            width: HEIGHT / 10,
                            height: HEIGHT / 10,
                            borderRadius: HEIGHT / 20,
                          }}
                          source={samesame}
                        />
                      </View>
                      <View style={styles.right}>
                        <Text>MSSV : {item.mssv}</Text>
                        <Text>Name :{item.name}</Text>
                        <Text>Class :{item.class}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.viewResult}>
          <View style={styles.viewResultChild}>
            <Text style={styles.textResult}>Total Student :   30</Text>
            <Text style={styles.textResult}>Student Current: 25</Text>
          </View>
          <View style={styles.viewResultChild}>
            <Text style={styles.textResult}>Student Unknow : 5</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  viewText: {
    height: 'auto',
    justifyContent: 'center',
    paddingVertical: 7,
    alignItems: 'center',
    backgroundColor: '#03a9f4',
  },
  textDirector: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#fff',
  },
  row: {
    // padding: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    height: HEIGHT / 9,
    width: WIDTH,
    color: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    height: HEIGHT / 10,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 2,
    height: HEIGHT / 10,
    width: 'auto',
    justifyContent: 'center',
    marginLeft: 50,
  },
  viewResult: {
    zIndex: 10,
    backgroundColor: '#4bacb8',
    height: HEIGHT / 9,
    width: WIDTH,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  textResult: {marginVertical: 5, fontSize: 15, width: WIDTH * 0.4},
  viewResultChild: {flexDirection: 'row', marginHorizontal: WIDTH / 14},
});
