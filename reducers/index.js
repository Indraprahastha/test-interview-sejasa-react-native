import { combineReducers } from 'redux'

const semuaData = {
  dataPengguna: null,
  dataCoin: [],
  dataCoinHoldUpdate: [],
}

const dataFilter = ( state = semuaData, action) => {
  switch (action.type) {
    case 'DATA_USER':
      return {...state, dataPengguna: action.data}
    case 'DATA_COIN':
    // alert('dimana'+JSON.stringify(action.data))
      return {...state, dataCoin: action.data}
    case 'DATA_COIN_HOLD':
      // alert(JSON.stringify(action.data))
      return {...state, dataCoinHoldUpdate: action.data}
    case 'DATABASE_COIN_HOLD':
      return {...state, dataCoinHoldUpdate: action.data}
    default:
      return state
  }
}

export default combineReducers({
  dataFilter,
});
