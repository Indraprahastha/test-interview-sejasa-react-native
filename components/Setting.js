import React, { Component } from 'react';
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux'

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'

// import store from '../store/index'
import { settingPassword } from '../actions/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Setting extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      passwordLama: '',
      passwordBaru: '',
      konfirmasiPasswordBaru: '',
      dataPasswordLama: null,
      dataUserLama: null,
      test: false,
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('dataPengguna').then((data) => {
      // alert(data)
      let dataPassword = JSON.parse(data)
      this.setState({
        dataUserLama: dataPassword.username,
        dataPasswordLama: dataPassword.password
      })
    }).catch((reason) => {
      console.log(reason);
    })
  }

  componentWillReceiveProps(nextProps) {
    // alert('sudah tergantikan')
    AsyncStorage.getItem('dataPengguna').then((data) => {
      // alert(data)
      let dataPassword = JSON.parse(data)
      this.setState({
        dataUserLama: dataPassword.username,
        dataPasswordLama: dataPassword.password
      })
    }).catch((reason) => {
      console.log(reason);
    })
  }

  kelolaPassword () {
    // alert('dimana')
    if (this.state.passwordLama && this.state.passwordBaru && this.state.konfirmasiPasswordBaru) {
      if (this.state.passwordLama === this.state.dataPasswordLama && this.state.passwordBaru === this.state.konfirmasiPasswordBaru) {
        // alert('amankan')
        let user = {
          username: this.state.dataUserLama,
          password: this.state.passwordBaru
        }
        this.props.settingPassword(user)
        this.setState({
          passwordLama: '',
          passwordBaru: '',
          konfirmasiPasswordBaru: '',
        })
      } else {
        alert('gaaman')
      }
    } else {
      alert('galengkap')
    }
  }

  render() {
    // alert(this.state.dataUserLama)
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.jarakAtas}></View>
        <TextInput
        style={styles.textInput}
        placeholder="Password Lama"
        onChangeText={(passwordLama) => this.setState({passwordLama})}
        value={this.state.passwordLama}
        />

        <TextInput
        style={styles.textInput}
        placeholder="Password Baru"
        onChangeText={(passwordBaru) => this.setState({passwordBaru})}
        value={this.state.passwordBaru}
        />

        <TextInput
        style={styles.textInput}
        placeholder="Konfirmasi Password Baru"
        onChangeText={(konfirmasiPasswordBaru) => this.setState({konfirmasiPasswordBaru})}
        value={this.state.konfirmasiPasswordBaru}
        />

        <View style={styles.buttonLogin}>
          <Text>* Note: Password harus selalu diingat, karena anda akan menggunakannya secara berkesinambungan</Text>
          <Button
          onPress={() => this.kelolaPassword()}
          title="Login"
          color="#841584"
          />
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    paddingTop: 30,
    width: responsiveWidth(90),
  },
  buttonLogin: {
    width: responsiveWidth(90),
  },
  jarakAtas: {
    height: 100,
  }
});

const mapStateToProps = (state) => {
  return {
    dataPengguna: state.dataFilter.dataPengguna
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    settingPassword: (data) => { dispatch( settingPassword(data) ) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)
