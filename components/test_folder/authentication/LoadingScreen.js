import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
	constructor(props) {
		super(props);
		this.getEmail();
	}

	getEmail = async () => {
		await AsyncStorage.getItem('userData').then((value) => {
			const userData = JSON.parse(value);
			this.props.navigation.navigate(userData ? 'App' : 'Auth');
		})

	};

	render() {
		return (	
			<View style={styles.container}>
				<Text style = {{fontSize: 20, color: 'black', fontWeight: 'bold'}}>Quản lý sinh viên</Text>
				<ActivityIndicator color='#66CDAA' size={40} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
