export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  defaults: {
    dashboard: [
      {gid: "", i: "0", x: 0, y: 0, w: 2, h: 4},
      {gid: "", i: "1", x: 2, y: 0, w: 2, h: 4},
      {gid: "", i: "2", x: 4, y: 0, w: 2, h: 4},
      {gid: "", i: "3", x: 6, y: 0, w: 2, h: 4},
      {gid: "", i: "4", x: 8, y: 0, w: 2, h: 4},
      {gid: "", i: "5", x: 10, y: 0, w: 2, h: 4},
      {gid: "", i: "6", x: 0, y: 4, w: 6, h: 4},
      {gid: "", i: "7", x: 6, y: 4, w: 6, h: 4},
      {gid: "", i: "8", x: 0, y: 8, w: 12, h: 6},
      {gid: "", i: "9", x: 0, y: 14, w: 12, h: 6},
      {gid: "", i: "10", x: 0, y: 20, w: 2, h: 4},
      {gid: "", i: "11", x: 2, y: 20, w: 2, h: 4},
      {gid: "", i: "12", x: 4, y: 20, w: 2, h: 4},
      {gid: "", i: "13", x: 6, y: 20, w: 2, h: 4},
      {gid: "", i: "14", x: 8, y: 20, w: 2, h: 4},
      {gid: "", i: "15", x: 10, y: 20, w: 2, h: 4},
    ]
  },
  rows: [],
  currentUser: {
    dashboard: [],
    permissions: []
  }
}, action) {

switch (action.type) {
  case "FETCH_CURRENT_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false
    }
  }
  case "FETCH_CURRENT_FULLFILLED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      currentUser: action.payload,
    }
  }
  case "FETCH_USER_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false
    }
  }
  case "FETCH_USER_FULLFILLED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      assets: action.payload
    }
  }
  case "SAVE_USER_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false
    }
  }
  case "SAVE_USER_FULLFILLED": {
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
