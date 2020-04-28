export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  assets: [],
  rows: [],
  metric: null,
  ranges: []
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
  case "FETCH_MODELSRANGE_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false
    }
  }
  case "FETCH_MODELSRANGE_FULLFILLED": {
    const ranges = state.ranges;
    const idx = ranges.findIndex(range => range.topic === action.payload.topic && range.model === action.payload.model);
    if (idx === -1) {
      const range = {
        topic: action.payload.topic,
        model: action.payload.model,
        fromDate: action.payload.fromDate,
        toDate: action.payload.toDate,
        data: action.payload.data
      };
      ranges.push(range);
    } else {
      ranges[idx].data = action.payload.data;
      ranges[idx].fromDate = action.payload.fromDate;
      ranges[idx].toDate = action.payload.toDate;
    }

    return {
      ...state,
      fetching: false,
      fetched: true,
      ranges: ranges
    }
  }

  default: break;
}
return state;
}
