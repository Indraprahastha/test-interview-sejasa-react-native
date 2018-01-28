import { AsyncStorage } from 'react-native'
import axios from 'axios'
import Realm from 'realm'

const coin = {
  name: 'coinhold',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    symbol: 'string',
    rank: 'string',
    price_usd: 'string',
    price_btc: 'string',
    market_cap_usd: 'string',
    available_supply: 'string',
    total_supply: 'string',
    max_supply: 'string',
    percent_change_1h: 'string',
    percent_change_24h: 'string',
    percent_change_7d: 'string',
    last_updated: 'string',
    inputHoldCoin: 'string',
  }
};


let realm = new Realm({ schema: [coin] });

export const getDataCoinHold = (data) => {
  return {
    type: 'DATA_COIN_HOLD',
    data
  }
}

export const getDatabaseCoinHold = (data) => {
  // alert(JSON.stringify(data))
  return {
    type: 'DATABASE_COIN_HOLD',
    data
  }
}

export const makeRegisterUser = (data) => {
  return {
    type: 'DATA_USER',
    data
  }
}

export const getDataCoin = (data) => {
  return {
    type: 'DATA_COIN',
    data
  }
}

export const registerUser = (value) => {
  return(dispatch) => {
    // alert(JSON.stringify(value))
    AsyncStorage.setItem('dataPengguna', JSON.stringify(value));
    return dispatch(makeRegisterUser(value))
  }
}

export const settingPassword = (value) => {
  return(dispatch) => {
    AsyncStorage.setItem('dataPengguna', JSON.stringify(value));
    return dispatch(makeRegisterUser(value))
  }
}

export const getApi = () => {
  return(dispatch) => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/')
    .then(({data}) => {
      let mengurutkan = data.sort((a,b) => {
        return parseFloat(b.price_usd) - parseFloat(a.price_usd)
      })
      let getDuaLima = []
      for (var i = 0; i < 25; i++) {
        getDuaLima.push(mengurutkan[i])
      }
      return dispatch(getDataCoin(getDuaLima))
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export const holdCoinToDatabase = (value) => {
  return(dispatch) => {

    let valueasi = value
    // alert(JSON.stringify(valueasi))
    realm.write(() => {
      realm.create('coinhold', {
        id: valueasi.id,
        name: valueasi.name,
        symbol: valueasi.symbol,
        rank: valueasi.rank,
        price_usd: valueasi.price_usd,
        price_btc: valueasi.price_btc,
        market_cap_usd: valueasi.market_cap_usd,
        available_supply: valueasi.available_supply,
        total_supply: valueasi.total_supply,
        max_supply: valueasi.max_supply ? valueasi.max_supply : '',
        percent_change_1h: valueasi.percent_change_1h,
        percent_change_24h: valueasi.percent_change_24h,
        percent_change_7d: valueasi.percent_change_7d,
        last_updated: valueasi.last_updated,
        inputHoldCoin: valueasi.inputHoldCoin,
      })
      Realm.open(coin).then(data => {
        return dispatch(getDataCoinHold(data.objects('coinhold')))
      });
    })

  }
}

export const getDataHoldCoin = () => {
  return(dispatch) => {
    Realm.open(coin).then(data => {
      return dispatch(getDatabaseCoinHold(data.objects('coinhold')))
    });
  }
}

export const changeHoldCoinToDatabase = (value) => {
  // alert(JSON.stringify(value))
  return(dispatch) => {
    let valueasi = value
    realm.write(() => {
      realm.create('coinhold', {
        id: valueasi.id,
        name: valueasi.name,
        symbol: valueasi.symbol,
        rank: valueasi.rank,
        price_usd: valueasi.price_usd,
        price_btc: valueasi.price_btc,
        market_cap_usd: valueasi.market_cap_usd,
        available_supply: valueasi.available_supply,
        total_supply: valueasi.total_supply,
        max_supply: valueasi.max_supply ? valueasi.max_supply : '',
        percent_change_1h: valueasi.percent_change_1h,
        percent_change_24h: valueasi.percent_change_24h,
        percent_change_7d: valueasi.percent_change_7d,
        last_updated: valueasi.last_updated,
        inputHoldCoin: valueasi.inputHoldCoin,
        }, true);
        Realm.open(coin).then(data => {
          return dispatch(getDataCoinHold(data.objects('coinhold')))
        });
    })
  }
}

export const deleteHoldCoinToDatabase = (value) => {
  return(dispatch) => {
    let valueasi = value
    realm.write(() => {
      let object =  realm.create('coinhold', {
        id: valueasi.id,
        name: valueasi.name,
        symbol: valueasi.symbol,
        rank: valueasi.rank,
        price_usd: valueasi.price_usd,
        price_btc: valueasi.price_btc,
        market_cap_usd: valueasi.market_cap_usd,
        available_supply: valueasi.available_supply,
        total_supply: valueasi.total_supply,
        max_supply: valueasi.max_supply ? valueasi.max_supply : '',
        percent_change_1h: valueasi.percent_change_1h,
        percent_change_24h: valueasi.percent_change_24h,
        percent_change_7d: valueasi.percent_change_7d,
        last_updated: valueasi.last_updated,
        inputHoldCoin: valueasi.inputHoldCoin,
      }, true);
        realm.delete(object);
        Realm.open(coin).then(data => {
          return dispatch(getDataCoinHold(data.objects('coinhold')))
        });
    })
  }
}
