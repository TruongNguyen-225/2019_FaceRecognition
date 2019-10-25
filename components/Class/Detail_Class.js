import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import QRCode from 'react-native-qrcode';

import firebase from 'react-native-firebase';
import Tittle from '../global/Tittle';

const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

export default class Detail_Class extends Component {
  constructor (props) {
    super (props);
    this.state = {text_Input: '', text_Output: ''};
  }
  static navigationOptions = {
    header: null,
  };
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     header: (
  //       <View
  //         style={{
  //           height: 45,
  //           backgroundColor: '#03a9f4',
  //           justifyContent: 'center',
  //         }}
  //       >
  //         <TouchableOpacity onPress={() => {
  //               this.props.navigation.goBack ();
  //             }}>
  //           <Image
  //             style={{height: 45, width: 45}}
  //             source={logoBack}
              
  //           />
  //         </TouchableOpacity>

  //         <Text
  //           style={{
  //             color: 'white',
  //             textAlign: 'center',
  //             fontSize: 14,
  //           }}
  //         >
  //           BarCode Screen
  //         </Text>
  //       </View>
  //     ),
  //   };
  // };

  getTextInput = () => {
    this.setState ({text_Output: this.state.text_Input});
  };
  componentDidMount () {
    var system = firebase
      .database ()
      .ref ()
      .child ('attendance system/' + this.props.navigation.state.params.thamso);
    console.log ('-path-', system.path);
    system.on ('value', childSnapshot => {
      const classRoom = [];
      childSnapshot.forEach (doc => {
        classRoom.push ({
          key: doc.key,
          className: doc.toJSON ().className,
        });
        this.setState ({
          class: classRoom.sort ((a, b) => {
            return a.className < b.className;
          }),
          loading: false,
        });
        console.log ('------->', this.state.class);
      });
    });
  }
  render () {
    // const { navigation } = this.props;
    // const itemId = navigation.getParam(thamso, 'NO-ID');
    const itemId = this.props.navigation.state.params.thamso;

    const {text_Input} = this.state;
    return (
      <View style={styles.container}>
      <Tittle onGoBack={()=> this.props.navigation.goBack()}/>
        <View style={styles.row1}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your URL"
            onChangeText={text => this.setState ({text_Input: text})}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            onPress={this.getTextInput}
            style={styles.getLinks1}
          >
            <Text style={{color: 'white', fontSize: 15}}>Generating</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewQrcode}>
          <QRCode
            value={this.state.text_Output}
            size={500}
            bgColor="black"
            fgColor="white"
          />

        </View>
        <View>
          <TouchableOpacity
            style={styles.follow}
            onPress={() => this.props.navigation.navigate ('FOLLOW_CLASS')}
          >
            <Text style={{color: 'white', fontSize: 16}}>Status Class</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  viewGetLinks: {
    height: 50,
    width: WIDTH,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getLinks: {
    height: 35,
    backgroundColor: '#039be5',
    borderColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    marginLeft: 40,
    marginVertical: 20,
  },
  follow: {
    height: 50,
    backgroundColor: '#039be5',
    borderColor: '#039be5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH * 0.8,
    marginHorizontal: (WIDTH - WIDTH * 0.8) / 2,
    marginVertical: 20,
  },
  row1: {
    flexDirection: 'row',
    width: WIDTH,
    height: 70,
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    height: 40,
    borderColor: '#ff6e40',
    borderWidth: 2,
    marginVertical: 20,
    borderRadius: 10,
    paddingLeft: 30,
    width: WIDTH - 150,
  },
  viewQrcode: {
    // paddingVertical: WIDTH * 0.1,
    marginTop: WIDTH / 2 - 125,
    marginLeft: WIDTH / 2 - 125,
    height: 260,
    width: 260,
    marginBottom: 25,
  },
});
