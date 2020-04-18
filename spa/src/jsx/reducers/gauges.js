export default function reducer( state={
  fetching: false,
  fetched: false,
  error: null,
  rows: {
    showInMenu: []
  }
}, action) {

switch (action.type) {
  case "FETCH_GAUGES_PENDING": {
    return {
      ...state,
      fetching: true,
      fetched: false
    }
  }
  case "FETCH_GAUGES_FULLFILLED": {
    const assets = action.payload;
    const rows = state.rows;
    const gauges = [];

    assets.forEach(function(asset) {
      asset.gauges.forEach(function(gauge) {
        if (gauge.showInMenu) {
          gauges.push({
            assetKey: asset.key,
            assetId: asset._id,
            assetName: asset.name,
            gauge: gauge
          })
        }
      })
    })

    rows.showInMenu = gauges;

    return {
      ...state,
      fetching: false,
      fetched: true,
      rows: rows
    }
  }
  default: break;
}
return state;
}
