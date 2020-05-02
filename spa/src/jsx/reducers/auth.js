export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  authenticated: false,
  registered: false,
  loginMessage: '',
  registerMessage: '',
  currentId: null
}, action) {

switch (action.type) {
  case "REGISTRATION_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false,
    }
  }
  case "REGISTRATION_FULFILLED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      registered: action.payload,
      registerMessage: ''
    }
  }
  case "REGISTRATION_REJECTED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      registered: false,
      registerMessage: action.payload
    }
  }
  case "SET_AUTHENTICATED_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false,
    }
  }
  case "SET_AUTHENTICATED_FULFILLED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      authenticated: action.payload
    }
  }
  case "FETCH_TOKEN_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false,
    }
  }
  case "FETCH_TOKEN_FULFILLED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      authenticated: action.payload.authenticated,
      currentId: action.payload.id
    }
  }
  case "FETCH_TOKEN_REJECTED": {
    return {
      ...state,
      fetching: false,
      fetched: true,
      authenticated: false,
      loginMessage: action.payload
    }
  }
  default: break;
};
return state;
}
