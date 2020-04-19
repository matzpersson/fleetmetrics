export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  default: []
}, action) {

switch (action.type) {
  case "FETCH_DASHBOARD_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false
    }
  }
  case "FETCH_DASHBOARD_FULLFILLED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      assets: action.payload
    }
  }

  default: break;
}
return state;
}
