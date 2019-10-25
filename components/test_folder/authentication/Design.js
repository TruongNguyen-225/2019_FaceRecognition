import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Alert, TextInput} from 'react-native';
import Button from 'react-native-button';
import firebase from 'react-native-firebase';
import {Login, Home, Info} from 'PhanAnh/subComponent/screenName';
import {setItemToAsyncStorage} from 'PhanAnh/miniComponent/function.js';
import OfflineNotice from 'PhanAnh/miniComponent/OfflineNotice'

const LearnAppRefUsers = firebase.database().ref('SV/Users');
export default class designComponent extends Component{
    constructor(props) {
		super(props);
		this.unsubcriber = null; 
		this.state = {
			typedEmail: '',
			typedPassword: '',
			user: '',
			role: 'Sinh viên',
			isUploading: false,
			code: '',
			pickerSelection: 'Chọn quyền',
      		pickerDisplayed: false
		};
    }
    componentDidMount() {
		this.unsubcriber = firebase.auth().onAuthStateChanged((changedUser) => {
			this.setState({
				user: changedUser
			});
		});
	}

	componentWillUnmount() {
		if (this.unsubcriber) {
			this.unsubcriber();
		}
    }
    onRegister = () => {
		if (this.state.typedEmail == '' || this.state.typedPassword == '') {
			Alert.alert('Thông báo','Email, Password không được bỏ trống');
			return;
		}
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword) 
			.then( async () => {
				const userData = {
                    email: this.state.typedEmail,
                    password: this.state.typedPassword,
                    role: this.state.role
                };

                LearnAppRefUsers.push(userData); 
                    
                await setItemToAsyncStorage('userData', userData); 
                Alert.alert('Thông báo','Đăng ký thành công\nTự động đăng nhập...');
                this.props.navigation.navigate('App');

        })
			//dang ky that bai
			.catch((error) => {
				alert(`${error.toString().replace('Error: ', '')}`);
			});
	};
    render(){
        return(
            <View style = {styles.contain}>
				<OfflineNotice />
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
					ĐĂNG KÝ TÀI KHOẢN
				</Text>
                <View style={[styles.propertyValueRowView]}>
                    <TextInput
						style={styles.multilineBox }
						placeholder='Nhập tài khoản...'
						multiline={true}
						editable={true}
						maxLength={50}
						onChangeText={(text) => {
							this.setState({ typedEmail: text });
						}}
					/>
                    </View> 
                <View style={[styles.propertyValueRowView]}>
                    <TextInput
						style={styles.multilineBox }
						placeholder='Nhập mật khẩu...'
						multiline={true}
						editable={true}
						maxLength={50}
						onChangeText={(text) => {
							this.setState({ typedPassword: text });
						}}
					/>
                    </View> 
                <Button
						containerStyle={{
							margin: '5%',
							padding: '3%',
							backgroundColor: 'rgb(290, 90, 50)',
							borderRadius: 5 ,
						}}
						style={{
							fontSize: 16,
							color: 'white'
						}}
						onPress={async () => {
							await this.onRegister();
						}}>
						Đăng ký
					</Button>
                    <Button
						style={{
							fontSize: 13,
							color: 'blue',
							
						}}
						onPress={async () => {
							this.props.navigation.goBack();
						}}>
						Trở về trang đăng nhập
					</Button>
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