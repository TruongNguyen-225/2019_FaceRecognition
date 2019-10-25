import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeModules
} from 'react-native';


import Video from 'react-native-video';

var ImagePicker = NativeModules.ImageCropPicker;

import Tittle from '../../global/Tittle';
import icons_list from '../../icons/icon_list.png';
import camera from '../../icons/icons8-compact-camera-96.png';
import img from '../../icons/icons8-full-image-96.png';


const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');


export default class CreateClass extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      image: null,
      images: null
    };
  }
  
pickSingleWithCamera(cropping, mediaType='photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => alert(e));
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }
  
  onPressAdd = () => {
    if (this.state.newClassName.trim () === '') {
      alert ('class name is blank');
      return;
    }
    try {
      system.push ({
        className: this.state.newClassName,
      });
    } catch (e) {
      alert (e);
    }
  };
  onGoToDetail = () => {
    const {className} = this.state.class;
    if (this.state.newClassName != '') {
      alert (this.state.newClassName);
      this.props.navigation.navigate ('CLASS_DETAILS', {
        thamso: this.state.newClassName,
      });
    }
  };
  refesh () {
    this.setState ({
      refesh: true,
    });
  }
  render () {
    return (
      <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0}}>
        <StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
        <Tittle onGoBack={() => this.props.navigation.goBack ()} />
        <View style={styles.addClass}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate ('ATTENDANCE')}
          >
            <View style={styles.rowCreateClass}>
              <View style={styles.viewImgIcon}>
                <Image source={icons_list} style={{height: 45, width: 45}} />
              </View>
              <View style={styles.viewText}>
                <Text style={styles.textDirector}>
                  Xem Danh Sách Lớp
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.addClass}>
          <TouchableHighlight
            // onPress={() => this.props.navigation.navigate ('CAMERA')}
            onPress={() => this.pickSingleWithCamera(false)}
          >
            <View style={styles.rowCreateClass}>
              <View style={styles.viewImgIcon}>
                <Image source={camera} style={{height: 45, width: 45}} />
              </View>
              <View style={styles.viewText}>
                <Text style={styles.textDirector}>
                 Điểm Danh Bằng Camera
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.addClass}>
          <TouchableHighlight
            // onPress={() => this.props.navigation.navigate ('CAMERA')}
            onPress={this.pickMultiple.bind(this)} 
          >
            <View style={styles.rowCreateClass}>
              <View style={styles.viewImgIcon}>
                <Image source={img} style={{height: 45, width: 45}} />
              </View>
              <View style={styles.viewText}>
                <Text style={styles.textDirector}>
                 Điểm Danh Bằng Hình Ảnh
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create ({
    rowCreateClass: {
        flexDirection: 'row',
        height: HEIGHT / 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingLeft: 20,
        backgroundColor: '#f1f1f1',
      },
      viewImgIcon: {
        justifyContent: 'center',
      },
      viewText: {
        height: HEIGHT / 10,
        justifyContent: 'center',
      },
      textDirector: {
        fontSize: 15,
        fontWeight: 'normal',
        margin: 10,
        paddingLeft: 10,
        position: 'absolute',
      },
});
