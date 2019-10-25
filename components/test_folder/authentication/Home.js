import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Alert, TextInput, TouchableHighlight} from 'react-native';
import Button from 'react-native-button';
import {Login, Home, Info} from 'PhanAnh/subComponent/screenName';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import {setItemToAsyncStorage,getItemFromAsyncStorage} from 'PhanAnh/miniComponent/function.js';
import OfflineNotice from 'PhanAnh/miniComponent/OfflineNotice';

const LearnAppRefUsers = firebase.database().ref('SV/Users');
export default class homeComponent extends Component{
	constructor(props){
        super(props);
        this.state = ({
            loading: false,
            email: '',
            currentItemId: '',
            itemData: {},
            typedEmail: '',
            shortEmail: '',
            userData: {},
			pickerDisplayed: false,
			currentUser: null,
			userData: {}
        });
    }

	deleteUser = () => {
		firebase
			.auth()
			.currentUser
			.delete() 
			.then( async () => {
				Alert.alert('Thông báo', 'Xóa tài khoản thành công');
				 await LearnAppRefUsers.orderByChild('email')
				.equalTo(this.state.userData.email)
				.on('child_added', (data) => {
					data.key;
					LearnAppRefUsers.child(data.key).remove();
				});
                    await AsyncStorage.clear();
                    this.props.navigation.navigate(Login);
			})
			.catch((error) => {
				Alert.alert(`${error.toString().replace('Error: ', '')}`);
			});
	};
	
	async componentDidMount() {
		const { currentUser } = firebase.auth()
		this.setState({ currentUser })
		await setItemToAsyncStorage('currentScreen', Home);
    	const currentItemId = await getItemFromAsyncStorage('currentItemId');
    	await AsyncStorage.getItem('userData').then((value) => {
        const userData = JSON.parse(value);
        this.setState({
            currentItemId: currentItemId,
            userData: userData
        });
        const shortEmail = this.state.userData.email.split('@').shift();
        this.setState({
      typedEmail: this.state.userData.email,
            shortEmail: shortEmail
        });
        });

	  }
    render(){
		const { currentUser } = this.state
        return(
            <View style = {styles.contain}>
				<OfflineNotice/>
                <ScrollView>
                <View style = {{alignItems:'center', justifyContent:'center'}}>
                <Text
					style={{
						fontSize: 22,
						fontWeight: 'bold',
						textAlign: 'center',
                        color: 'grey',
                        marginTop: '2%'
					}}>
					HOME
				</Text>
				<Text style={{
						fontSize: 16,
						fontWeight: 'bold',
						textAlign: 'center',
                        color: 'grey',
                        marginTop: '2%'
					}}>
                 Xin chào {currentUser && currentUser.email}!
                </Text>
                <Button
						containerStyle={{
							margin: '5%',
							padding: '3%',
							backgroundColor: '#66CDAA',
                            borderRadius: 5 ,
                            width: 300
						}}
						style={{
							fontSize: 16,
							color: 'white'
						}}
						onPress={async () => {
							const { navigate } = this.props.navigation;//chu y
                    		navigate(Info);
						}}>
						Cập nhật thông tin cá nhân
					</Button>
                    <Button
						containerStyle={{
							margin: '5%',
							padding: '3%',
							backgroundColor: '#66CDAA',
                            borderRadius: 5 ,
                            width: 300
						}}
						style={{
							fontSize: 16,
							color: 'white'
						}}
						onPress={async () => {
							Alert.alert('Thông báo','Trang đăng ký');
						}}>
						Đăng ký lớp học
					</Button>
                    <Button
						containerStyle={{
							margin: '5%',
							padding: '3%',
							backgroundColor: '#66CDAA',
                            borderRadius: 5 ,
                            width: 300
						}}
						style={{
							fontSize: 16,
							color: 'white'
						}}
						onPress={async () => {
							Alert.alert('Thông báo','Trang lớp đã đăng ký');
						}}>
						Xem lớp đã đăng ký
					</Button>
				<Button containerStyle={{
							margin: '5%',
							padding: '3%',
							backgroundColor: '#66CDAA',
                            borderRadius: 5 ,
						}}
						style={{
							fontSize: 16,
							color: 'white'
						}}
                onPress = { async () => {
                    Alert.alert('Thông báo', 'Đăng xuất thành công');
                    await AsyncStorage.clear();
                    this.props.navigation.navigate(Login);
                }}>
                    Logout
                </Button>
				<Button containerStyle={{
							margin: '5%',
							padding: '3%',
							backgroundColor: '#66CDAA',
                            borderRadius: 5 ,
						}}
						style={{
							fontSize: 16,
							color: 'white'
						}}
                onPress = {this.deleteUser}>
                    Xóa tài khoản
                </Button>

                </View>
            <View style = {{
            backgroundColor: '#66CDAA',
            alignContent:'center',
            height: '100%',
            flexDirection: 'column',
            marginTop:'15%'
            
          }}>
            
             <Text style = {{color: 'grey', fontWeight:'bold', marginLeft:'2%'}}>Chú thích: </Text>
             <Text style = {{
                                fontWeight: 'bold',
                                fontStyle: 'italic',
								color: 'white',
								alignSelf: 'flex-start', 
								marginLeft: '5%'
                            }}>
                 1. Cập nhật thông tin cá nhân: Sinh viên truy cập vào mục này để thêm hoặc cập nhật 
                 thông tin cá nhân của chính mình theo quy định (bắt buộc).
             </Text>
             <Text style = {{
                                fontWeight: 'bold',
                                fontStyle: 'italic',
								color: 'white',
								alignSelf: 'flex-start', 
								marginLeft: '5%'
                            }}>
                 2. Đăng ký lớp học: Sinh viên truy cập mục này để đăng ký môn mình muốn học, 
                 dựa theo mã code mà giảng viên đưa để đăng ký (bắt buộc).
             </Text>
             <Text style = {{
                                fontWeight: 'bold',
                                fontStyle: 'italic',
								color: 'white',
								alignSelf: 'flex-start', 
								marginLeft: '5%'
                            }}>
                 3. Xem lớp đã đăng ký: Giúp sinh viên có thể xem được các lớp học mình đã đăng ký.
             </Text>
            
          </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor:'#F1F1F1'
    },
    multilineBox: {
		width: '96%',
		height: 50,
		marginTop: 20,
		borderColor: '#66CDAA',
		borderWidth: 2,
        textAlignVertical: 'top',
         backgroundColor: 'white',
        marginLeft: '2%',
        marginRight: '2%',
        borderRadius:5
  },
  propertyValueRowView: {
		flexDirection: 'row',
        justifyContent: 'flex-start',
		marginTop: 0,
		marginBottom: 0
  },
})