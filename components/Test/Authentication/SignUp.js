import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,

} from 'react-native';
import firebase from 'react-native-firebase';

const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

export default class SignUp extends Component {
  constructor (props) {
    super (props);
    this.state = {email: '', password: ''};
  }
  // onGoToLogIn=()=> {
  //   this.props.navigation.navigate('SIGNIN')
  // }
  onSuccess=()=> {
    Alert.alert(
      'Notice',
      'Sign up successfully',
      [{text: 'OK', onPress: this.onGoToSignIn}],
      {cancelable: false}
    );
  }
  
  Register = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.onSuccess)
      .catch(error => this.setState({ errorMessage: error.message }))
  };

  render() {
    const {inputStyle, bigButton, buttonText} = styles;
    return (
      <View>
        <TextInput
          style={inputStyle}
          placeholder="Enter your email"
          value={this.state.email}
          onChangeText={text => this.setState({email: text})}
        />
        <TextInput
          style={inputStyle}
          placeholder="Enter your password"
          value={this.state.password}
          secureTextEntry
          onChangeText={text => this.setState({password: text})}
        />
        <TextInput
          style={inputStyle}
          placeholder="Re-enter your password"
          value={this.state.rePassword}
          secureTextEntry
          onChangeText={text => this.setState({rePassword: text})}
        />
        <TouchableOpacity
          style={bigButton}
          onPress={this.Register}
        >
          <Text style={buttonText}>SIGN UP NOW</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={bigButton}
          onPress={this.onSuccess}
        >
          <Text style={buttonText}>SIGN UP NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 20,
    paddingLeft: 30,
  },
  bigButton: {
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Avenir',
    color: '#fff',
    fontWeight: '400',
  },
});
