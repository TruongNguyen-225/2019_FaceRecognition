import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Alert, TextInput} from 'react-native';
import firebase from 'react-native-firebase';
import Button from 'react-native-button';
import {Login, Home, Info, Design} from 'PhanAnh/subComponent/screenName';
import {setItemToAsyncStorage} from 'PhanAnh/miniComponent/function.js';
import OfflineNotice from 'PhanAnh/miniComponent/OfflineNotice'

const LearnAppRefUsers = firebase.database().ref('SV/Users');
export default class loginComponent extends Component{
    constructor(props) {
		super(props);
		this.unsubcriber = null; 
		this.state = {
			typedEmail: '',
			typedPassword: '',
			user: null,
			role: 'Người dùng',
			isUploading: false,
			code: '',
			pickerSelection: 'Chọn quyền',
			pickerDisplayed: false,
			isAuthenticated: false,
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
	getUserFromDB() {
		return new Promise((resolve) => {
			LearnAppRefUsers.orderByChild('email')
				.equalTo(this.state.typedEmail)
				.on('value', (childSnapshot) => {
					var userData = {};
					childSnapshot.forEach((doc) => {
						userData = {
							email: doc.toJSON().email,
							password: doc.toJSON().password,
							role: doc.toJSON().role
						};
					});
					resolve(userData);
				});
		});
	}
	onLogin = () => {
		if (this.state.typedEmail == '' || this.state.typedPassword == '') {
			Alert.alert('Thông báo','Email và Password không được bỏ trống');
			return;
		}
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword) 
			.then( async (loginUser) => {
				const userData = await this.getUserFromDB();
				setItemToAsyncStorage('userData', userData);
				console.log(userData);
				Alert.alert('Thông báo','Đăng nhập thành công');
				this.props.navigation.navigate('App');
			})
			.catch((error) => {
				Alert.alert(`${error.toString().replace('Error: ', '')}`);
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
					ĐĂNG NHẬP
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
							backgroundColor: '#66CDAA',
							borderRadius: 5 ,
						}}
						style={{
							fontSize: 16,
							color: 'white'
						}}
						onPress={this.onLogin}>
						Đăng nhập
					</Button>
					<Button
						style={{
							fontSize: 13,
							color: 'blue',
							
						}}
						onPress={async () => {
							const { navigate } = this.props.navigation;
                    		navigate(Design);
						}}>
						Bạn chưa có tài khoản?
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