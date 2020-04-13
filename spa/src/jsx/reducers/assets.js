export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  rows: [],
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
  default: break;
}
return state;
}
