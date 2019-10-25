import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import firebase from 'react-native-firebase';
import {setItemToAsyncStorage} from  '../../global/Global';



const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

const RootRef = firebase.database ().ref().child('members');



export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    email: '',
    password: '',
    errorMessage: null,
    MSGV: '',
    fullName: '',
    numberPhone: '',
    address: '',
    dateBirthday: '',
    sex: '',
  };
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
    handleSignUp = () => {
		if (this.state.email == '' || this.state.password == '') {
			Alert.alert('Thông báo','Email, Password không được bỏ trống');
			return;
		}
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password) 
			.then( async () => {
				const userData = {
                    email: this.state.email,
                    password: this.state.password,
                };

                RootRef.push(userData); 
                    
                await setItemToAsyncStorage('userData', userData); 
                Alert.alert('Thông báo','Đăng ký thành công\nTự động đăng nhập...');
                this.props.navigation.navigate('Main');

        })
			//dang ky that bai
			.catch((error) => {
				alert(`${error.toString().replace('Error: ', '')}`);
			});
	};
  render () {
    return (
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{color: 'red'}}>
            {this.state.errorMessage}
          </Text>}
        <View style={styles.viewTextInput}>

          <TextInput
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState ({email})}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.inputStyle}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState ({password})}
            value={this.state.password}
          />
        </View>
        <View style={{marginTop: HEIGHT * 0.02, alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={this.handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    width: WIDTH * 0.9,
    height: 50,
    backgroundColor: '#90caf9',
    marginBottom: 10,
    borderRadius: 30,
    paddingLeft: 30,
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
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
