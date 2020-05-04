export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  serial: 0,
  rows: [],
  current:{}
}, action) {

switch (action.type) {
  case "UPDATE_ASSET_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false
    }
  }
  case "UPDATE_ASSET_FULLFILLED": {
    const assets = state.rows;
    const idx = assets.findIndex(asset => asset._id === action.payload._id);
    assets.splice(idx, 1, action.payload)
    console.log("FULLFILLED", assets)
    return {
      ...state,
      fetching: false,
      fetched: true,
      serial: state.serial + 1,
      rows: assets,
      current: action.payload
    }
  }
  case "FETCH_ASSETS_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false
    }
  }
  case "FETCH_ASSETS_FULLFILLED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      rows: action.payload
    }
  }
  case "FETCH_ASSET_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false,
    }
  }
  case "FETCH_ASSET_FULFILLED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      current: action.payload
    }
  }
  case "FETCH_ASSET_REJECTED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
    }
  }
  default: break;
}
return state;
}
