import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import { Provider } from 'react-redux'
import { connect } from 'react-redux'

import store from './store/index'

import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'

import HomeBeforeRegister from './components/HomeBeforeRegister'
import HomeAfterRegister from './components/HomeAfterRegister'
import NilaiTukar from './components/NilaiTukar'
import Setting from './components/Setting'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// const BeforeRegister = StackNavigator ({
//   HomeBeforeRegister: { screen: HomeBeforeRegister }
// })

const AfterRegister = TabNavigator ({
  Rates: { screen: HomeAfterRegister },
  NilaiTukar: { screen: NilaiTukar },
  Setting: { screen: Setting }
})


class App extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      indikator: false,
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('dataPengguna').then((data) => {
      // this.setState({indikator: null})
      this.setState({indikator: JSON.parse(data)})
      // alert(data)
      // if (data) {
      //   console.log("fuckyou", data);
      //   this.props.setId({_id: data})
      // } else {
      //   this.props.setId({})
      // }
    }).catch((reason) => {
      // console.log(reason);
    })
  }

  registerSukses () {
    this.setState({indikator: !this.state.indikator})
  }

  render() {
    // alert('aman')
    if (this.state.indikator) {
      return (<Provider store={store}><AfterRegister /></Provider>)
    } else if (this.state.indikator === null) {
      return (<Provider store={store}><HomeBeforeRegister registerSukses={() => this.registerSukses()}/></Provider>)
    } else {
      return (<View></View>)
    }
  }
}


const styles = StyleSheet.create({
});

export default App
