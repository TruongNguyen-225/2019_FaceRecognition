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

export default class SignIn extends Component {
  constructor (props) {
    super (props);
    this.unsubcriber = null;
    this.state = {
      email: '',
      password: '',
      user: null,
      isAuthenticated: false,
      userData: {},
    };
  }

  onSuccess () {
    Alert.alert (
      'Notice',
      'Sign up successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.goBackToMain ();
          },
        },
      ],
      {cancelable: false}
    );
  }
  
  Login = () => {
    if (this.state.email == '' || this.state.password == '') {
      Alert.alert ('Email và Password không được bỏ trống');
      return;
    }
    firebase
      .auth ()
      .signInWithEmailAndPassword (this.state.email, this.state.password)
      .then (() => this.onSuccess ())
      .catch(error => this.setState({ errorMessage: error.message }));
  };
  render () {
    const {email, password} = this.state;
    const {inputStyle, bigButton, buttonText} = styles;
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={inputStyle}
            placeholder="Enter your email"
            value={email}
            onChangeText={text => this.setState ({email: text})}
          />
          <TextInput
            style={inputStyle}
            placeholder="Enter your password"
            value={password}
            secureTextEntry
            onChangeText={text => this.setState ({password: text})}
          />
          <TouchableOpacity style={bigButton} onPress={this.Login}>
            <Text style={buttonText}>SIGN IN NOW</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
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
