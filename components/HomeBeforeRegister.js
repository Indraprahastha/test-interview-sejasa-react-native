import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import store from '../store/index'
import { registerUser } from '../actions/index'

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class HomeBeforeRegister extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      konfirmasiPassword: '',
      dataPengguna: this.props.dataPengguna
    }
  }

  componentWillMount () {
    // setTimeout(() => {
    //   alert(JSON.stringify(this.props.registerSukses()))
    // }, 3000);
  }

  componentWillReceiveProps(nextProps) {
    this.props.registerSukses()
  }

  login () {
    if (this.state.username && this.state.password && this.state.konfirmasiPassword) {
      if (this.state.password === this.state.konfirmasiPassword) {
        let user = {
          username: this.state.username,
          password: this.state.password
        }
        this.props.registerUser(user)
      } else {
        alert('pass ga sama')
      }
    } else {
      alert('galengkap')
    }
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.jarakAtas}></View>
        <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(username) => this.setState({username})}
        value={this.state.username}
        />

        <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        />

        <TextInput
        style={styles.textInput}
        placeholder="Konfirmasi Password"
        onChangeText={(konfirmasiPassword) => this.setState({konfirmasiPassword})}
        value={this.state.konfirmasiPassword}
        />

        <View style={styles.buttonLogin}>
          <Text>* Note: Password harus selalu diingat, karena anda akan menggunakannya secara berkesinambungan</Text>
          <Button
          onPress={() => this.login()}
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
    registerUser: (data) => { dispatch( registerUser(data) ) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBeforeRegister)
