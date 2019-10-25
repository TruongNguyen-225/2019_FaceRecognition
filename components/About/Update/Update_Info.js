import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Picker,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

const RootRef = firebase.database ().ref ().child ('members');

import DatePicker from 'react-native-datepicker';
import logoBack from '../../icons/icons8-double-left-96.png';
import camera from '../../icons/icons8-compact-camera-96.png';

const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

var thoigian = new Date ();
var hours = thoigian.getHours ();
var minutes = thoigian.getMinutes ();
var seconds = thoigian.getSeconds ();
var date = thoigian.getDate ();
var month = thoigian.getMonth () + 1;
var year = thoigian.getFullYear ();

var currentDay = year + '-' + month + '-' + date;

export default class Update_Info extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {currentUser: null};
  constructor (props) {
    super (props);
    this.unsubcriber = null;
    this.state = {
      email: '',
      password: '',
      user: null,
      isAuthenticated: false,
      userData: {},
      date: currentDay,
      MSGV: '',
      fullName: '',
      numberPhone: '',
      address: '',
      dateBirthday: '',
      sex: '',
    };
  }
  componentDidMount () {
    const {currentUser} = firebase.auth ();
    this.setState ({currentUser});

    console.log ('hiện ra current ', currentUser.id);
  }
  // getOneItemFromDatabase() {
	// 	console.log('getOne running');
	// 	LearnAppRef.orderByChild('id')
	// 		.equalTo(this.state.currentItemId)
	// 		.on('value', (childSnapshot) => {
	// 			console.log('getOne running INSIDE 1');
	// 			//Get OneItem
	// 			var itemData = {};
	// 			childSnapshot.forEach((doc) => {
	// 				console.log('getOne running INSIDE 2');
	// 				itemData = {
	// 					id: doc.toJSON().id,
	// 					uploader: doc.toJSON().uploader,
	// 					description: doc.toJSON().description,
	// 					position: doc.toJSON().position,
	// 					violation: doc.toJSON().violation,
	// 					status: doc.toJSON().status,
	// 					reason: doc.toJSON().reason,
	// 					updater: doc.toJSON().updater,
	// 					proofs: doc.toJSON().proofs,
	// 					date: doc.toJSON().date,
	// 					contact: doc.toJSON().contact,
	// 					address: doc.toJSON().address,
	// 					datereport: doc.toJSON().datereport,
	// 					report: doc.toJSON().report
	// 				};
	// 				console.log('itemData INSIDE 2');
	// 				console.log(itemData);
	// 			});
	// 			this.setState({
	// 				itemData: itemData
	// 			});
	// 			console.log('getOne AFTER');
	// 			console.log(this.state.itemData);
	// 		});
	// }

  async update () {
    try {
      const {currentUser} = this.state;
      await RootRef.orderByChild (currentUser && currentUser.email)
        .equalTo (currentUser && currentUser.email)
        .on ('child_added', data => {
          data.key;
          RootRef.child (data.key).update ({
            MSSV: this.state.MSSV,
            fullName: this.state.fullName,
            numberPhone: this.state.numberPhone,
            address: this.state.address,
            dateBirthday: this.state.dateBirthday,
            sex: this.state.sex,
          });
        });
      Alert.alert ('Thông báo', 'Cập nhật thành công!');
      this.props.navigation.navigate ('Main');
    } catch (error) {
      alert (error);
    }
  }
  render () {
    const {inputStyle, bigButton, buttonText, inputStyle1} = styles;
    const {email, currentUser} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentChild}>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack ();
              }}
              style={{height: 30, width: 30}}
            >
              <Image style={{height: 30, width: 30}} source={logoBack} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewText}>
            <Text style={styles.styleText}>
              CẬP NHẬT THÔNG TIN
            </Text>
          </View>
          <View style={styles.rowAbout} />
        </View>
        <View style={styles.containerChild}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <View style={styles.viewHeader} />
              <View style={styles.uploadAvatar}>
                <Image source={camera} style={{height: 30, width: 30}} />
              </View>

            </View>
            <View style={styles.viewTextInput}>
              <TextInput
                style={inputStyle1}
                placeholder=""
                value={currentUser && currentUser.email}
                editable={false}
                // onChangeText={text => this.setState ({MSSV: text})}
              />
              <TextInput
                style={inputStyle}
                placeholder="Nhập mã số giảng viên của bạn "
                value={this.state.MSSV}
                onChangeText={text => this.setState ({MSSV: text})}
              />
              <TextInput
                style={inputStyle}
                placeholder="Nhập đầy đủ họ tên của bạn"
                value={this.state.fullName}
                onChangeText={text => this.setState ({fullName: text})}
              />
              <TextInput
                style={inputStyle}
                placeholder="Nhập số điện thoại của bạn"
                value={this.state.numberPhone}
                onChangeText={text => this.setState ({numberPhone: text})}
              />
              <View style={styles.viewPickerBig}>
                <View style={styles.viewDatePicker}>
                  <View style={styles.textDateTime}>
                    <Text style={{color: '#597D9A'}}>Ngày sinh </Text>
                  </View>
                  <View style={{marginLeft: 30}}>
                    <DatePicker
                      style={{
                        width: 220,
                        fontSize: 12,
                        backgroundColor: '#fff',
                      }}
                      date={this.state.date}
                      // mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="1900-01-01"
                      maxDate="2019-01-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={true}
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          right: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          // marginLeft: 36,
                        },

                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={date => {
                        this.setState ({date: date});
                      }}
                    />
                    {/* <Text style={styles.instructions}>
                    date: {this.state.date}
                  </Text> */}
                  </View>
                </View>
              </View>
              <View style={styles.viewPicker}>
                <View style={styles.viewTextPicker}>
                  <Text style={{color: '#597D9A'}}>Giới tính </Text>
                </View>
                <View style={styles.viewModalPicker}>
                  <Picker
                    selectedValue={this.state.language}
                    style={{
                      height: 40,
                      width: 220,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState ({language: itemValue})}
                  >
                    <Picker.Item label="Nam" value="nam" />
                    <Picker.Item label="Nữ" value="nữ" />
                  </Picker>
                </View>
              </View>
            </View>

          </ScrollView>

        </View>
        <View
          style={{
            marginTop: HEIGHT * 0.02,
            alignItems: 'center',
            marginBottom: 50,
          }}
        >
          <TouchableOpacity style={bigButton} onPress={this.update.bind (this)}>
            <Text style={buttonText}>Cập Nhật Thông Tin</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  containerChild: {
    backgroundColor: '#fff',
    width: WIDTH - 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: HEIGHT - 45 - 165,
  },
  viewHeader: {
    height: 130,
    width: 130,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 65,
    alignItems: 'center',
    marginVertical: HEIGHT / 20,
    zIndex: 1,
    borderColor: 'red',
    borderWidth: 1,
    // position:'absolute'
  },
  inputStyle: {
    width: WIDTH * 0.9,
    height: 50,
    backgroundColor: '#90caf9',
    marginBottom: 10,
    borderRadius: 30,
    paddingLeft: 30,
  },
  inputStyle1: {
    width: WIDTH * 0.9,
    height: 50,
    backgroundColor: '#90caf9',
    marginBottom: 10,
    borderRadius: 30,
    paddingLeft: 30,
    color: '#666',
    fontWeight: '600',
  },
  bigButton: {
    width: WIDTH * 0.9,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0093c4',
  },
  buttonText: {
    fontFamily: 'Avenir',
    color: '#fff',
    fontWeight: '400',
  },
  viewTextInput: {
    marginTop: -HEIGHT / 15,
  },
  content: {
    height: 45,
    backgroundColor: '#03a9f4',
    flexDirection: 'row',
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
  uploadAvatar: {
    height: 60,
    backgroundColor: '#f1f1f1',
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    top: -110,
    zIndex: 10,
    position: 'relative',
    left: 60,
  },
  viewPickerBig: {
    height: 50,
    width: WIDTH * 0.9,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#90caf9',
  },
  textDateTime: {
    // marginTop: -15,
    paddingLeft: 30,
    width: 100,
  },
  viewDatePicker: {
    borderColor: 'green',
    height: 45,
    width: WIDTH * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPicker: {
    height: 50,
    width: WIDTH * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    backgroundColor: '#90caf9',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  viewTextPicker: {
    paddingLeft: 30,
    width: 100,
  },
  viewModalPicker: {
    borderWidth: 1,
    borderColor: '#999',
    marginLeft: 30,
  },
});
