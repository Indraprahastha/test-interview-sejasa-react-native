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
  // Modal,
  AppState,
  RefreshControl,
} from 'react-native';

import { connect } from 'react-redux'

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import Modal from "react-native-modal";

import { getApi, holdCoinToDatabase, getDataHoldCoin } from '../actions/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class HomeAfterRegister extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      modalCoinVisible: false,
      indikatorPassword: AppState.currentState,
      modalPasswordVisible: true,
      inputPassword: '',
      dataPasswordLama: null,
      dataUserLama: null,
      refreshing: false,
      dataOriginalCoinModal: {},
      inputHoldCoin: '',
      realm: null,
      indikatorHold: 0,
    }
  }

  masukanData() {
    let object = {
      id: this.state.dataOriginalCoinModal.id,
      name: this.state.dataOriginalCoinModal.name,
      symbol: this.state.dataOriginalCoinModal.symbol,
      rank: this.state.dataOriginalCoinModal.rank,
      price_usd: this.state.dataOriginalCoinModal.price_usd,
      price_btc: this.state.dataOriginalCoinModal.price_btc,
      market_cap_usd: this.state.dataOriginalCoinModal.market_cap_usd,
      available_supply: this.state.dataOriginalCoinModal.available_supply,
      total_supply: this.state.dataOriginalCoinModal.total_supply,
      max_supply: this.state.dataOriginalCoinModal.max_supply,
      percent_change_1h: this.state.dataOriginalCoinModal.percent_change_1h,
      percent_change_24h: this.state.dataOriginalCoinModal.percent_change_24h,
      percent_change_7d: this.state.dataOriginalCoinModal.percent_change_7d,
      last_updated: this.state.dataOriginalCoinModal.last_updated,
      inputHoldCoin: this.state.inputHoldCoin,
    }
    this.props.holdCoinToDatabase(object)
    this.setState({inputHoldCoin: ''})
    // alert(JSON.stringify(object))
    this.closeModalCoin()
  }

  holdCoin() {
    if (this.state.indikatorHold+1 < 8) {

      if (this.props.dataCoinHoldUpdate.length) {
        let count = 0;
        for (var key in this.props.dataCoinHoldUpdate) {
          if (this.props.dataCoinHoldUpdate[key].name == this.state.dataOriginalCoinModal.name) {
            count++
          }
        }

        count > 0 ? alert('Coin ini sudah ada, silahkan pilih koin lainnya') : this.masukanData()

      } else {
        this.masukanData()
      }

    } else {
      // alert('lebih')
      // this.setState({inputHoldCoin: ''})
      this.closeModalCoin()
      alert('Anda Kelebiha Muatan')
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.getApi()
    this.setState({refreshing: false});
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillMount () {
    this.props.getDataHoldCoin()
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

    this.props.getApi()
    // alert(this.state.appState)
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
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
    
    this.setState({indikatorHold: this.props.dataCoinHoldUpdate.length})
  }

  openCloseModalCoin(data) {
    this.setState({dataOriginalCoinModal: data})
    this.setState({modalCoinVisible:!this.state.modalCoinVisible});
  }

  closeModalCoin(){
    // alert(JSON.stringify(this.state.dataOriginalCoinModal))
    this.setState({modalCoinVisible:!this.state.modalCoinVisible});
  }

  openCloseModalPassword() {
    this.setState({modalPasswordVisible:!this.state.modalPasswordVisible})
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.indikatorPassword.match('background') && nextAppState === 'active') {
      this.setState({modalPasswordVisible: true})
    }
    this.setState({indikatorPassword: nextAppState});
  }

  inputPassword() {
    if (this.state.inputPassword === this.state.dataPasswordLama) {
      this.setState({modalPasswordVisible: !this.state.modalPasswordVisible})
      this.setState({inputPassword: ''})
    } else {
      alert('Password Salah, Masukan yang benar')
    }
  }


  render() {
    let list = this.props.dataCoin
    let amankan = this.props.dataCoinHoldUpdate

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
      <View style={styles.container}>
        {
          list.map((data, key) => {
              return(
                <View style={styles.containerData}>

                  <View style={styles.containerLeft}>
                    <Text style={styles.nama}>{data.name}</Text>
                  </View>

                  <View style={styles.containerRight}>
                    <Text>24 Jam: </Text>
                    <Text>Price USD: </Text>
                  </View>

                  <View style={styles.containerRight}>
                    <Text>{data.percent_change_24h}</Text>
                    <Text>{data.price_usd}</Text>
                  </View>

                  <View style={styles.containerRight}>
                    <Button
                    onPress={()=> this.openCloseModalCoin(data)}
                    title="Buka"
                    color="#000000"
                    />
                  </View>

                </View>
              )
            })
        }

        <Modal
        visible={this.state.modalCoinVisible}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => this.openCloseModalCoin()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={{color: 'white'}}>{this.state.dataOriginalCoinModal.name}</Text>
              <TextInput
              style={styles.textBoxCoin}
              placeholder="TextBox"
              underlineColorAndroid='white'
              placeholderTextColor="white"
              onChangeText={(inputHoldCoin) => this.setState({inputHoldCoin})}
              value={this.state.inputHoldCoin}
              />

              <View style={styles.bungkusButtonCoin}>
                <Button
                onPress={() => this.holdCoin()}
                title="Hold"
                color="blue"
                />
              </View>

              <View style={styles.bungkusButtonCoin}>
                <Button
                onPress={() => this.closeModalCoin()}
                title="Cencel"
                color="red"
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
        visible={this.state.modalPasswordVisible}
        style={styles.modalPasswordContainer}
        >
          <View style={styles.innerPasswordContainer}>
            <Text style={styles.textInputOpening}>Input password anda untuk melanjutkan:</Text>
            <TextInput
            style={styles.textInputPassword}
            placeholder="Masukan Password"
            underlineColorAndroid='white'
            placeholderTextColor="white"
            onChangeText={(inputPassword) => this.setState({inputPassword})}
            value={this.state.inputPassword}
            />
            <View style={styles.bungkusButtonPassword}>
            <Button
            onPress={() => this.inputPassword()}
            title="Login"
            color="red"
            />
            </View>
          </View>
        </Modal>

      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 25,
  },
  textInputPassword: {
    width: responsiveWidth(90),
    color: 'white',
  },
  bungkusButtonPassword: {
    width: responsiveWidth(90),
  },
  textInputOpening: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'white'
  },
  containerData: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  containerLeft: {
    justifyContent: 'center',
    flex: 1,
    // alignItems: 'center',
  },
  containerRight: {
    flex: 1,
    // flexDirection: 'row',
  },
  nama: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 10,
  },
  innerContainer: {
    alignItems: 'center',
  },
  textBoxCoin: {
    width: responsiveWidth(70),
    color: 'white'
  },
  bungkusButtonCoin: {
    width: responsiveWidth(70),
    paddingBottom: 10,
  },
  modalPasswordContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 0,
    // margin: 50,
  },
  innerPasswordContainer: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  // alert(JSON.stringify(state.dataFilter.dataCoin))
  return {
    dataPengguna: state.dataFilter.dataPengguna,
    dataCoin: state.dataFilter.dataCoin,
    dataCoinHoldUpdate: state.dataFilter.dataCoinHoldUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getApi: () => { dispatch( getApi() ) },
    holdCoinToDatabase: (data) => { dispatch( holdCoinToDatabase(data) ) },
    getDataHoldCoin: () => { dispatch( getDataHoldCoin() )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAfterRegister)
