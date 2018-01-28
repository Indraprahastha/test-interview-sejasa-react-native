import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput
} from 'react-native';

import { connect } from 'react-redux'

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import Modal from "react-native-modal";

import { getApi, holdCoinToDatabase, getDataHoldCoin, changeHoldCoinToDatabase, deleteHoldCoinToDatabase } from '../actions/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class NilaiTukar extends Component<{}> {
  constructor (props) {
    super(props)
    this.state = {
      tampilkan: null,
      indikatorEdt: false,
      changeHoldCoin: '',
      dataWillChangeHoldCoin: '',
      totalAset: 0,
      totalPembeli: 0,
    }
  }

  openCloseModalCoinHold(data, value) {
    // alert(JSON.stringify(value))
    this.setState({dataWillChangeHoldCoin: value})
    this.setState({changeHoldCoin: data })
    this.setState({indikatorEdt:!this.state.indikatorEdt})
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.dataCoinHoldUpdate) == '{}' || JSON.stringify(this.props.dataCoinHoldUpdate) == '[]') {
      this.setState({tampilkan: <View style={styles.containerData}><Text style={styles.nama}>Anda tidak punya koin, tolong beli beberapa!</Text></View>})
    } else {
      this.setState({tampilkan:
        this.props.dataCoinHoldUpdate.map((data, key) => {
            return(
              <View style={styles.containerData}>

                <View style={styles.containerLeft}>
                  <Text style={styles.nama}>{data.name}</Text>
                </View>

                <View style={styles.containerRight}>
                  <Text style={styles.textSatuan}>Total Coin: </Text>
                  <Text style={styles.textSatuan}>Total Price USD: </Text>
                  <Text style={styles.textSatuan}>Unit Price: </Text>
                  <Text style={styles.textSatuan}>Change 24h </Text>
                  <Text style={styles.textSatuan}>Price Now </Text>
                </View>

                <View style={styles.containerRight}>
                  <Text style={styles.textSatuan}>{data.inputHoldCoin}</Text>
                  <Text style={styles.textSatuan}>{(Number(data.price_usd) * Number(data.inputHoldCoin)).toString()}</Text>
                  <Text style={styles.textSatuan}>{data.price_usd}</Text>
                  <Text style={styles.textSatuan}>{data.percent_change_24h}</Text>
                  {this.check(data)}
                </View>

                <View style={styles.containerRight}>
                  <Button
                  onPress={()=> this.openCloseModalCoinHold(data.inputHoldCoin, data)}
                  title="Edit"
                  color="#000000"
                  />
                </View>

              </View>
            )
          }
        )
      })
    }
    this.setState({totalAset: 0})
    this.kalkulasi()

  }

  kalkulasi() {
    let totalPembelian = 0;
    let totalSaatIni = 0;
    for (var i = 0; i < this.props.dataCoinHoldUpdate.length; i++) {

      let dataInputHoldCoin = Number(this.props.dataCoinHoldUpdate[i].inputHoldCoin)

      let dataInputHoldCoinDollar = Number(this.props.dataCoinHoldUpdate[i].price_usd)

      let dataInvestasiUsd = this.checkAkumulasi(this.props.dataCoinHoldUpdate[i])

      totalSaatIni+=dataInputHoldCoin*dataInvestasiUsd
      totalPembelian+= dataInputHoldCoin*dataInputHoldCoinDollar
      // alert(JSON.stringify(this.props.dataCoinHoldUpdate[i]))
    }
    this.setState({totalAset: totalSaatIni})
    this.setState({totalPembeli: totalPembelian})
  }

  checkAkumulasi(data) {
    for (var i = 0; i < this.props.dataCoin.length; i++) {
      if (this.props.dataCoin[i].name == data.name) {
        return this.props.dataCoin[i].price_usd
      } else {

      }
    }
  }

  check(data) {
    if (JSON.stringify(this.props.dataCoin)!='[]') {
      for (var i = 0; i < this.props.dataCoin.length; i++) {
        if (this.props.dataCoin[i].name == data.name) {
          return <Text style={styles.textSatuan}>{this.props.dataCoin[i].price_usd}</Text>
        }
      }
      // alert(JSON.stringify(this.props.dataCoin))
    }
  }

  changeHoldCoin() {
    let object = {
      id: this.state.dataWillChangeHoldCoin.id,
      name: this.state.dataWillChangeHoldCoin.name,
      symbol: this.state.dataWillChangeHoldCoin.symbol,
      rank: this.state.dataWillChangeHoldCoin.rank,
      price_usd: this.state.dataWillChangeHoldCoin.price_usd,
      price_btc: this.state.dataWillChangeHoldCoin.price_btc,
      market_cap_usd: this.state.dataWillChangeHoldCoin.market_cap_usd,
      available_supply: this.state.dataWillChangeHoldCoin.available_supply,
      total_supply: this.state.dataWillChangeHoldCoin.total_supply,
      max_supply: this.state.dataWillChangeHoldCoin.max_supply,
      percent_change_1h: this.state.dataWillChangeHoldCoin.percent_change_1h,
      percent_change_24h: this.state.dataWillChangeHoldCoin.percent_change_24h,
      percent_change_7d: this.state.dataWillChangeHoldCoin.percent_change_7d,
      last_updated: this.state.dataWillChangeHoldCoin.last_updated,
      inputHoldCoin: this.state.changeHoldCoin,
    }
    this.props.changeHoldCoinToDatabase(object)
    this.setState({indikatorEdt:!this.state.indikatorEdt})
    // alert(JSON.stringify(this.state.dataWillChangeHoldCoin))
  }

  deleteHoldCoin(data) {
    let object = {
      id: this.state.dataWillChangeHoldCoin.id,
      name: this.state.dataWillChangeHoldCoin.name,
      symbol: this.state.dataWillChangeHoldCoin.symbol,
      rank: this.state.dataWillChangeHoldCoin.rank,
      price_usd: this.state.dataWillChangeHoldCoin.price_usd,
      price_btc: this.state.dataWillChangeHoldCoin.price_btc,
      market_cap_usd: this.state.dataWillChangeHoldCoin.market_cap_usd,
      available_supply: this.state.dataWillChangeHoldCoin.available_supply,
      total_supply: this.state.dataWillChangeHoldCoin.total_supply,
      max_supply: this.state.dataWillChangeHoldCoin.max_supply,
      percent_change_1h: this.state.dataWillChangeHoldCoin.percent_change_1h,
      percent_change_24h: this.state.dataWillChangeHoldCoin.percent_change_24h,
      percent_change_7d: this.state.dataWillChangeHoldCoin.percent_change_7d,
      last_updated: this.state.dataWillChangeHoldCoin.last_updated,
      inputHoldCoin: this.state.changeHoldCoin,
    }
    this.props.deleteHoldCoinToDatabase(object)
    this.setState({indikatorEdt:!this.state.indikatorEdt})
  }

  componentWillMount() {
    this.props.getApi()
  }

  render() {
    let list = this.props.dataCoinHoldUpdate
    let convert = this.state.totalAset.toString()

    return (
      <ScrollView>
      <View style={styles.container}>

      <View style={styles.containerTotal}>
        <View style={styles.subContainerTotal}>
          <Text style={styles.judulTotal}>Total Aset Saat Ini: </Text>
          <Text style={styles.isiTotal}>Total Aset Pembelian: </Text>
        </View>
        <View>
          <Text>{this.state.totalAset}</Text>
          <Text>{this.state.totalPembeli}</Text>
        </View>
      </View>

      {
        this.state.tampilkan
      }

      <Modal
      visible={this.state.indikatorEdt}
      animationType={'fade'}
      transparent={true}
      onRequestClose={() => this.openCloseModalCoinHold()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>

            <TextInput
            style={styles.textBoxCoin}
            placeholder="TextBox"
            underlineColorAndroid='white'
            placeholderTextColor="white"
            onChangeText={(changeHoldCoin) => this.setState({changeHoldCoin})}
            value={this.state.changeHoldCoin}
            />

            <View style={styles.bungkusButtonCoin}>
              <Button
              onPress={() => this.changeHoldCoin()}
              title="Change KCoin"
              color="blue"
              />
            </View>

            <View style={styles.bungkusButtonCoin}>
            <Button
            onPress={() => this.deleteHoldCoin()}
            title="Delete"
            color="red"
            />
            </View>

            <View style={styles.bungkusButtonCoin}>
              <Button
              onPress={() => this.openCloseModalCoinHold()}
              title="Cencel"
              color="red"
              />
            </View>
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
  judulTotal: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  isiTotal: {
    fontWeight: 'bold',
  },
  subContainerTotal: {
    flex: 1
  },
  containerTotal: {
    flexDirection: 'row',
    margin: 5,
  },
  textSatuan: {
    height: 35
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 10,
    marginTop: 50,
    marginBottom: 50,
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
    justifyContent: 'center',
    margin: 5,
  },
  nama: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => {
  // alert(JSON.stringify(state.dataFilter.dataCoin))
  return {
    dataCoin: state.dataFilter.dataCoin,
    dataCoinHoldUpdate: state.dataFilter.dataCoinHoldUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getApi: () => { dispatch( getApi() ) },
    holdCoinToDatabase: (data) => { dispatch( holdCoinToDatabase(data) ) },
    getDataHoldCoin: () => { dispatch( getDataHoldCoin() )},
    changeHoldCoinToDatabase: (data) => { dispatch( changeHoldCoinToDatabase(data) )},
    deleteHoldCoinToDatabase: (data) => { dispatch( deleteHoldCoinToDatabase(data) ) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NilaiTukar)
