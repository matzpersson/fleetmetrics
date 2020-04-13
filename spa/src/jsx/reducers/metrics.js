export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  assets: [],
  rows: [],
  metric: null
}, action) {

switch (action.type) {
  case "PUT_METRICS_FULLFILLED": {
    const assets = state.assets;
    const idx = assets.findIndex(asset => asset.key === action.payload.topic);
    if (idx === -1) {
      const asset = {key: action.payload.topic, model: action.payload.sentenceModel, lastData: action.payload.data};
      assets.push(asset)
    } else {
      assets[idx].lastData = action.payload.data
    }

    const rows = state.rows;
    rows.unshift(action.payload)

    return {
      ...state,
      fetching: false,
      fetched: true,
      metric: action.payload,
      assets: assets,
      rows: rows
    }
  }
  // case "FETCH_ASSETS_PENDING": {
  //   return {
  //     ...state,
  //     fetching: true,
  //     fetched: false
  //   }
  // }
  // case "FETCH_ASSETS_FULLFILLED": {
  //   return {
  //     ...state,
  //     fetching: false,
  //     fetched: true,
  //     // assets: action.payload
  //   }
  // }

  default: break;
}
return state;
}
