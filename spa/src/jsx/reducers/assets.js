export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  rows: [],
  current:{}
}, action) {

switch (action.type) {
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
