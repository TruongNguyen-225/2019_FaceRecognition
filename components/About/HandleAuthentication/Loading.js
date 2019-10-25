import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';


export default class Loading extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor (props) {
    super (props);
    this.getEmail();
    this.state = {
      isCheck: false,
    };
  }
  // componentDidMount () {
  //   firebase.auth ().onAuthStateChanged (user => {
  //     return this.props.navigation.navigate (user ? 'Main' : 'Authentication');
  //   });
  // }

  getEmail = async () => {
		await AsyncStorage.getItem('userData').then((value) => {
			const userData = JSON.parse(value);
			this.props.navigation.navigate(userData ? 'Main' : 'Authentication');
		})

	};
  render () {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
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
});
